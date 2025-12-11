const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });

// Vercel configuration
const isVercel = process.env.VERCEL === '1';
const PORT = process.env.PORT || 4000;

// SSE clients
const sseClients = new Set();

function sendSseEvent(eventName, payload) {
  const dataStr = JSON.stringify({ event: eventName, payload });
  for (const res of sseClients) {
    try {
      res.write(`data: ${dataStr}\n\n`);
    } catch (err) {
      console.error('Error enviando SSE a cliente:', err.message);
    }
  }
}

// Middleware para autenticar token JWT si está presente
function authenticateTokenOptional(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return next();
  const token = authHeader.split(' ')[1];
  if (!token) return next();
  jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret', (err, user) => {
    if (err) return next();
    req.user = user;
    next();
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.query.token;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret', (err, user) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Middleware para roles: requiere admin
function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Token requerido' });
  if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Acceso restringido a administradores' });
  next();
}

// Middleware para roles: requiere encargado o admin
function requireEncargado(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Token requerido' });
  if (req.user.rol !== 'encargado' && req.user.rol !== 'admin') return res.status(403).json({ error: 'Acceso restringido a encargados o administradores' });
  next();
}

// Util: validar email simple y campos
function isValidEmail(email) {
  return typeof email === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function sanitizeBoolean(val) {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return ['1','true','yes','y'].includes(val.toLowerCase());
  return false;
}

// Agregamos manejadores de errores globales para depuración
process.on('uncaughtException', (err) => {
  if (err.message && err.message.includes('db_termination')) {
    console.warn('Advertencia: Conexión a DB cerrada por Supabase (plan free). Esto es normal.');
    return;
  }
  console.error('Error no detectado (Uncaught Exception):', err);
});

process.on('unhandledRejection', (reason, promise) => {
  if (reason && reason.message && reason.message.includes('db_termination')) {
    console.warn('Advertencia: Promesa rechazada por cierre de DB (Supabase plan free)');
    return;
  }
  console.error('Rechazo de promesa no manejado (Unhandled Rejection) en:', promise, 'razón:', reason);
});

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  schema: 'public',
  ssl: { rejectUnauthorized: false },
  family: 4,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Manejar errores del pool de conexiones
pool.on('error', (err, client) => {
  if (err.message && err.message.includes('db_termination')) {
    console.warn('Pool de conexiones: DB cerrada por Supabase (normal en plan free)');
    return;
  }
  console.error('Error inesperado en el pool de conexiones:', err.message);
});

// Helper: small sleep utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper: ejecutar consultas con reintentos
async function queryWithRetry(queryText, params = [], retries = 4, delayMs = 500) {
  let attempt = 0;
  while (true) {
    try {
      attempt++;
      return await pool.query(queryText, params);
    } catch (err) {
      const transient = err && (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN' || err.code === 'ECONNREFUSED' || err.code === 'ENETUNREACH' || (err.message && err.message.includes('getaddrinfo')));
      if (!transient || attempt > retries) {
        throw err;
      }
      const wait = delayMs * Math.pow(2, attempt - 1);
      console.warn(`Query attempt ${attempt} failed with transient error (${err.code || err.message}). Retrying in ${wait}ms...`);
      await sleep(wait);
    }
  }
}

// Verificar conexión a BD
queryWithRetry('SELECT NOW()', [], 3, 500)
  .then(() => {
    console.log('Conexión a la base de datos verificada correctamente.');
  })
  .catch(err => {
    console.warn('Advertencia: No se pudo conectar a la base de datos:', err.message);
  });

// Iniciar el servidor solo si no estamos en Vercel
if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Define la ruta absoluta para guardar las fotos
const uploadDir = isVercel
  ? path.join('/tmp', 'uploads', 'habitaciones')
  : path.join(__dirname, '..', 'public', 'img', 'habitaciones');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${encodeURIComponent(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Configuración para carrusel
const carouselDir = isVercel
  ? path.join('/tmp', 'uploads', 'carousel')
  : path.join(__dirname, '..', 'public', 'img', 'carousel');

if (!fs.existsSync(carouselDir)) {
  fs.mkdirSync(carouselDir, { recursive: true });
}

const carouselStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carouselDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${encodeURIComponent(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const uploadCarousel = multer({ storage: carouselStorage });

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde public/
const staticPath = isVercel
  ? path.join(__dirname, '..', 'public')
  : path.join(__dirname, '..', 'Fronted', 'Public', 'Principal');

app.use(express.static(staticPath));

// Servir imágenes
const imgStatic = isVercel
  ? path.join(__dirname, '..', 'public', 'img')
  : path.join(__dirname, '..', 'Fronted', 'Public', 'img');

app.use('/img', express.static(imgStatic));

// Evitar 404 en /favicon.ico
app.get('/favicon.ico', (req, res) => {
  try {
    const faviconPath = path.join(imgStatic, 'favicon.ico');
    if (fs.existsSync(faviconPath)) return res.sendFile(faviconPath);
    const fallback = path.join(imgStatic, 'logo_pequeño.png');
    if (fs.existsSync(fallback)) return res.sendFile(fallback);
    return res.status(204).end();
  } catch (err) {
    console.error('Error sirviendo favicon:', err);
    return res.status(500).end();
  }
});

// ...existing code...

// Exportar el app para Vercel
module.exports = app;