# 🌸 Kalai Medical Center - Frontend

Aplicación web premium desarrollada con Next.js para Kalai Medical Center.

## 🚀 Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Zustand** - Gestión de estado
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificaciones

## 🎨 Diseño

- **Estilo**: Premium, minimalista, tipo Apple
- **Colores**: Paleta beige/crema + verde sage
- **Fuentes**: Inter (body) + Playfair Display (headings)
- **Responsive**: Mobile-first design

## 📋 Prerequisitos

- Node.js 18+ 
- npm o yarn
- Backend corriendo en `http://localhost:8000`

## 🔧 Instalación

1. **Instalar dependencias**
```bash
cd kalai-frontend
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WHATSAPP_NUMBER=+50688926754
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

El sitio estará en `http://localhost:3000`

## 📁 Estructura

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── productos/         # Catálogo público
│   └── admin/             # Panel de administración
├── components/            # Componentes reutilizables
│   ├── layout/           # Navbar, Footer
│   ├── home/             # Componentes del home
│   └── products/         # Componentes de productos
├── lib/                  # Utilidades
│   └── api.ts           # Cliente API
├── store/               # Estado global (Zustand)
│   └── authStore.ts    # Autenticación
└── types/              # Tipos TypeScript
    └── index.ts       # Interfaces compartidas
```

## 🌐 Páginas

### Públicas
- `/` - Página principal
- `/productos` - Catálogo completo
- `/nosotros` - Acerca de (próximamente)
- `/contacto` - Contacto (próximamente)

### Admin
- `/admin` - Login
- `/admin/dashboard` - Panel de control

## 🎯 Funcionalidades

### Público
✅ Página principal premium con animaciones
✅ Catálogo de productos con filtros
✅ Búsqueda de productos
✅ Botones de WhatsApp para compra
✅ Diseño responsivo
✅ Navegación fluida

### Admin
✅ Login seguro con JWT
✅ Dashboard de productos
✅ Crear, editar, eliminar productos
✅ Activar/desactivar productos
✅ Gestión de stock
✅ Vista en tabla

## 🔐 Autenticación

El panel admin usa JWT almacenado en localStorage (Zustand + persist).

Credenciales por defecto:
- Usuario: `admin`
- Contraseña: `kalai2026`

## 🚀 Deploy en Vercel

1. Push a GitHub
2. Importar en Vercel
3. Configurar variables de entorno:
   - `NEXT_PUBLIC_API_URL`: URL de tu backend en producción
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: +50688926754
4. Deploy!

## 🎨 Paleta de Colores

```css
kalai-cream: #F5EFE7    /* Fondo principal */
kalai-beige: #E8DCC8    /* Secundario */
kalai-sage: #9DAB8E     /* Acento principal */
kalai-sage-dark: #7A8A6F /* Acento hover */
kalai-gold: #C9A86A     /* Detalles */
kalai-brown: #6B5E4C    /* Texto */
kalai-white: #FDFBF7    /* Blanco cálido */
```

## 📝 Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Servidor producción
npm run lint     # Linter
```

## 🔗 API Endpoints Usados

### Públicos
- `GET /api/public/products` - Lista productos
- `GET /api/public/products/:id` - Detalle producto
- `GET /api/public/categories` - Categorías
- `GET /api/public/whatsapp-link/:id` - Link WhatsApp

### Admin
- `POST /api/admin/login` - Login
- `GET /api/admin/products` - Todos los productos
- `POST /api/admin/products` - Crear producto
- `PUT /api/admin/products/:id` - Actualizar
- `DELETE /api/admin/products/:id` - Eliminar
- `PATCH /api/admin/products/:id/toggle-active` - Activar/desactivar

## 🆘 Troubleshooting

**Error de conexión al API**
- Verificar que el backend esté corriendo
- Verificar `NEXT_PUBLIC_API_URL` en `.env.local`
- Revisar CORS en el backend

**Estilos no se cargan**
- Ejecutar `npm install`
- Reiniciar servidor dev

## 👨‍💻 Desarrollado por

Miguel R. - 2026
