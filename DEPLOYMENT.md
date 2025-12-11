# Hotel Management System - Gran Hotel El Libertador

## 🚀 Despliegue en Vercel

### Pre-requisitos
- Cuenta en Vercel
- Base de datos PostgreSQL (Supabase, Neon, etc.)
- Variables de entorno configuradas

### Variables de Entorno Requeridas
Configura estas variables en tu proyecto de Vercel:

\\\env
DB_USER=tu_usuario
DB_HOST=tu_host.supabase.co
DB_DATABASE=postgres
DB_PASSWORD=tu_password
DB_PORT=5432
JWT_SECRET=tu_secreto_jwt_seguro
NODE_ENV=production
\\\

### Pasos para Desplegar

1. **Instalar Vercel CLI** (opcional):
   \\\ash
   npm install -g vercel
   \\\

2. **Desde GitHub**:
   - Sube tu proyecto a GitHub
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Configura las variables de entorno
   - ¡Despliega!

3. **Desde CLI**:
   \\\ash
   cd HOTEL-MP
   vercel
   \\\

### Estructura del Proyecto
\\\
HOTEL-MP/
├── api/
│   └── server.js          # API Backend
├── public/
│   ├── img/               # Imágenes estáticas
│   └── Principal/         # Frontend (HTML, CSS, JS)
├── vercel.json            # Configuración de Vercel
└── package.json           # Dependencias
\\\

### Funcionalidades
- ✅ Sistema de reservas de habitaciones
- ✅ Gestión de usuarios (Cliente, Encargado, Admin)
- ✅ Sistema de pagos con seguimiento
- ✅ Chat IA asistente virtual
- ✅ Panel administrativo completo
- ✅ Dashboard con métricas en tiempo real
- ✅ Carrusel de imágenes dinámico
- ✅ Sistema de reclamos y solicitudes

### Tecnologías
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT
- **Despliegue**: Vercel

### Post-Despliegue
1. Verifica que todas las rutas funcionen correctamente
2. Prueba el sistema de autenticación
3. Verifica la conexión a la base de datos
4. Asegúrate de que las imágenes carguen correctamente

### Troubleshooting
- **Error 404**: Revisa las rutas en \ercel.json\
- **Error de BD**: Verifica las variables de entorno
- **Imágenes no cargan**: Asegúrate de que estén en \/public/img/\

### Soporte
Para más información, contacta al equipo de desarrollo.
