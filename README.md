# 🏨 Gran Hotel El Libertador - Sistema de Gestión Hotelera

Sistema completo de gestión hotelera con panel de administración, reservas online, gestión de pagos y asistente virtual con IA.

## 🚀 Despliegue en Vercel

### Requisitos Previos

1. **Cuenta en Vercel** - [Regístrate gratis aquí](https://vercel.com/signup)
2. **Base de datos PostgreSQL** - Puedes usar [Supabase](https://supabase.com) (gratis)
3. **Cuenta de GitHub** (opcional, pero recomendado)

### Paso 1: Preparar Base de Datos

1. Ve a [Supabase](https://supabase.com) y crea un proyecto gratuito
2. En el panel de Supabase, ve a **Project Settings** → **Database**
3. Copia la **Connection String** (formato: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`)
4. Guarda estos datos:
   - `DB_USER`: postgres
   - `DB_HOST`: [tu-host].supabase.co
   - `DB_DATABASE`: postgres
   - `DB_PASSWORD`: tu contraseña
   - `DB_PORT`: 5432

### Paso 2: Subir a GitHub (Recomendado)

```bash
# Inicializar repositorio Git
cd "d:\MP\Hoteles\Hotel-MP versión 5.0"
git init

# Agregar archivos
git add .

# Crear commit
git commit -m "Preparado para Vercel"

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/hotel-el-libertador.git
git push -u origin main
```

### Paso 3: Desplegar en Vercel

#### Opción A: Desde GitHub (Recomendado)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Haz clic en **Import Git Repository**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración
5. Configura las **Variables de Entorno**:
   - `DB_USER`: tu_usuario_supabase
   - `DB_HOST`: tu_host_supabase
   - `DB_DATABASE`: postgres
   - `DB_PASSWORD`: tu_contraseña
   - `DB_PORT`: 5432
   - `JWT_SECRET`: genera_una_clave_segura_aleatoria
   - `NODE_ENV`: production
6. Haz clic en **Deploy**

#### Opción B: Desde CLI de Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Desplegar
cd "d:\MP\Hoteles\Hotel-MP versión 5.0"
vercel

# Seguir las instrucciones y agregar las variables de entorno cuando se soliciten
```

### Paso 4: Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en **Settings** → **Environment Variables**
3. Agrega todas las variables del archivo `.env.example`

**Variables requeridas:**
```
DB_USER=postgres
DB_HOST=tu-proyecto.supabase.co
DB_DATABASE=postgres
DB_PASSWORD=tu_contraseña_supabase
DB_PORT=5432
JWT_SECRET=clave_jwt_muy_segura_de_32_caracteres_minimo
NODE_ENV=production
```

### Paso 5: Verificar el Despliegue

Una vez desplegado, Vercel te dará una URL como:
```
https://hotel-el-libertador.vercel.app
```

Prueba estas rutas:
- **Frontend**: `https://tu-proyecto.vercel.app/Principal/index.html`
- **API**: `https://tu-proyecto.vercel.app/api/habitaciones`
- **Panel Admin**: `https://tu-proyecto.vercel.app/Principal/PanelAdmin.html`

## 📁 Estructura del Proyecto

```
Hotel-MP versión 5.0/
├── api/
│   ├── server.js              # Servidor principal (Express + PostgreSQL)
│   └── payment_service.js     # Servicio de pagos
├── public/
│   ├── Principal/
│   │   ├── index.html         # Página principal
│   │   ├── PanelAdmin.html    # Panel administrativo
│   │   ├── PanelCliente.html  # Panel del cliente
│   │   ├── habitaciones.html  # Búsqueda de habitaciones
│   │   ├── *.css              # Estilos
│   │   └── *.js               # Scripts del frontend
│   └── img/                   # Imágenes y recursos
├── package.json               # Dependencias principales
├── vercel.json                # Configuración de Vercel
├── .vercelignore              # Archivos a ignorar
├── .env.example               # Ejemplo de variables de entorno
└── README.md                  # Este archivo
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo local
npm run dev

# Producción
npm start

# Build (no es necesario para Vercel)
npm run build
```

## 🎨 Características

### Para Clientes
- ✅ Búsqueda de habitaciones con filtros avanzados
- ✅ Sistema de reservas con pago parcial (50% mínimo)
- ✅ Panel personal con historial de reservas
- ✅ Sistema de reclamos y solicitudes
- ✅ Asistente virtual con IA (HotelBot)

### Para Administradores
- ✅ Dashboard con métricas en tiempo real
- ✅ Gestión completa de habitaciones (CRUD)
- ✅ Gestión de categorías y precios
- ✅ Control de reservas y pagos
- ✅ Sistema de carrusel de imágenes
- ✅ Gestión de encargados

### Para Encargados
- ✅ Gestión de habitaciones
- ✅ Atención de reclamos y solicitudes
- ✅ Gestión de reservas
- ✅ Notificaciones en tiempo real (SSE)

## 🔐 Seguridad

- Autenticación JWT
- Contraseñas hasheadas con bcrypt
- Roles de usuario (Admin, Encargado, Cliente)
- Validación de datos en frontend y backend
- Conexión SSL a base de datos

## 🗄️ Base de Datos

El proyecto usa PostgreSQL con las siguientes tablas principales:

- `usuarios` - Usuarios del sistema
- `roles` - Roles de acceso
- `habitaciones` - Información de habitaciones
- `categorias_habitaciones` - Tipos de habitaciones
- `reservas` - Reservas de clientes
- `pagos` - Historial de pagos
- `reclamos` - Reclamos y solicitudes
- `habitaciones_fotos` - Fotos de habitaciones
- `hotel_config` - Configuración general

## 📝 Notas Importantes

1. **Almacenamiento de archivos**: En producción, las imágenes se guardan en el filesystem de Vercel. Para mayor escalabilidad, considera usar servicios como:
   - Cloudinary
   - AWS S3
   - Vercel Blob Storage

2. **Base de datos**: Supabase ofrece 500MB gratis. Para proyectos más grandes:
   - Supabase Pro
   - Railway
   - Render PostgreSQL

3. **Límites de Vercel**:
   - Plan gratuito: 100GB de ancho de banda/mes
   - Funciones serverless: 10 segundos de timeout máximo
   - Límite de tamaño: 250MB por deployment

## 🐛 Solución de Problemas

### Error: "Database connection failed"
- Verifica que las variables de entorno estén correctamente configuradas en Vercel
- Asegúrate de que Supabase esté activo y acepte conexiones externas

### Error: "Module not found"
- Ejecuta `npm install` en tu proyecto local
- Verifica que `package.json` tenga todas las dependencias

### Las imágenes no se cargan
- Verifica que las rutas sean absolutas (empiecen con `/`)
- Revisa que las imágenes estén en la carpeta `public/img/`

## 📞 Soporte

Para problemas o consultas:
- Email: info@el-libertador.pe
- WhatsApp: +51 956 789 012

## 📄 Licencia

ISC License - Hotel MP Team © 2025

---

**¡Tu hotel está listo para despegar! 🚀**