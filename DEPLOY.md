# 🚀 GUÍA RÁPIDA DE DESPLIEGUE EN VERCEL

## ⚡ Despliegue en 5 Minutos

### 1️⃣ Preparar Base de Datos (2 minutos)

1. Ve a **[Supabase.com](https://supabase.com)** → Crea cuenta gratis
2. Crea nuevo proyecto → Espera 2 minutos
3. Ve a **Settings** → **Database** → Copia:
   ```
   Host: db.xxxxxxxxxx.supabase.co
   Database: postgres
   User: postgres
   Password: [tu-contraseña]
   Port: 5432
   ```

### 2️⃣ Subir a GitHub (1 minuto)

```bash
# Abrir terminal en la carpeta del proyecto
cd "d:\MP\Hoteles\Hotel-MP versión 5.0"

# Inicializar Git
git init
git add .
git commit -m "🎉 Hotel El Libertador listo para producción"

# Crear repositorio en GitHub.com y ejecutar:
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

### 3️⃣ Desplegar en Vercel (2 minutos)

1. Ve a **[vercel.com/new](https://vercel.com/new)**
2. **Import Git Repository** → Selecciona tu repo
3. **Agrega las Environment Variables**:
   ```
   DB_USER=postgres
   DB_HOST=db.xxxxxxxxxx.supabase.co
   DB_DATABASE=postgres
   DB_PASSWORD=tu_contraseña_supabase
   DB_PORT=5432
   JWT_SECRET=genera_una_clave_aleatoria_de_32_caracteres_minimo
   NODE_ENV=production
   ```
4. Click **Deploy** 🚀

### ✅ ¡Listo! Tu hotel está en línea

URL de tu sitio: `https://tu-proyecto.vercel.app`

---

## 🎯 COMANDOS RÁPIDOS

### Desplegar desde CLI de Vercel

```bash
# Instalar Vercel CLI (solo la primera vez)
npm install -g vercel

# Login
vercel login

# Desplegar
vercel
```

### Actualizar el sitio

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de cambios"
git push

# Vercel desplegará automáticamente
```

---

## 📋 CHECKLIST DE DESPLIEGUE

- [ ] Base de datos PostgreSQL creada en Supabase
- [ ] Variables de entorno copiadas
- [ ] Repositorio Git creado en GitHub
- [ ] Proyecto conectado a Vercel
- [ ] Despliegue exitoso
- [ ] Prueba: Abrir `https://tu-proyecto.vercel.app/Principal/index.html`
- [ ] Prueba API: `https://tu-proyecto.vercel.app/api/habitaciones`
- [ ] Crear usuario administrador en la base de datos

---

## 🔧 CREAR USUARIO ADMIN

Ejecuta este SQL en Supabase SQL Editor:

```sql
-- Insertar rol admin si no existe
INSERT INTO roles (nombre) VALUES ('admin') ON CONFLICT DO NOTHING;

-- Crear usuario admin (contraseña: admin123)
INSERT INTO usuarios (nombre, email, password, rol)
VALUES (
  'Administrador',
  'admin@hotel.com',
  '$2b$10$rBV2YrKzLqxE5Y.Kx8vHUO0Kj/1QZfGWzXHYqvPX3vQlR7YRbLKK.',
  (SELECT id_rol FROM roles WHERE nombre = 'admin')
);
```

**Credenciales:**
- Email: `admin@hotel.com`
- Password: `admin123`

⚠️ **IMPORTANTE**: Cambia esta contraseña después del primer login

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Database connection failed"
✅ Verifica variables de entorno en Vercel → Settings → Environment Variables

### Error: "Cannot GET /"
✅ Accede a: `https://tu-proyecto.vercel.app/Principal/index.html`

### Las imágenes no cargan
✅ Verifica que las rutas empiecen con `/img/...`

### Error 500 en API
✅ Revisa logs en Vercel → Functions → Ver logs de errores

---

## 📞 SOPORTE

- **Email**: info@el-libertador.pe
- **WhatsApp**: +51 956 789 012

## 🎉 ¡Felicidades!

Tu sistema de gestión hotelera está en producción y listo para recibir reservas.

**Próximos pasos:**
1. Personaliza los textos e imágenes
2. Configura las categorías de habitaciones
3. Sube fotos de tus habitaciones
4. Configura el carrusel de la página principal
5. ¡Empieza a recibir reservas!

---

**Versión**: 5.0  
**Última actualización**: Diciembre 2025