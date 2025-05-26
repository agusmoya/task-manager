# 🧠 Todo App Frontend (React + Vite + TypeScript)

Este es el frontend de una aplicación de gestión de tareas (Todo App), desarrollado con **React 18**, **TypeScript**, **Vite** y **Redux Toolkit**. La arquitectura está pensada para ser escalable, mantenible y moderna, con especial enfoque en seguridad, experiencia de usuario (UX) y accesibilidad.

## 📦 Stack

- React 18 + TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- Axios con interceptores para manejo de autenticación
- ESLint + Prettier integrados

## 🛠 Instalación

```bash
pnpm install
```

## 🚀 Scripts

```bash
pnpm dev        # Inicia el servidor de desarrollo
pnpm build      # Compila el proyecto para producción
pnpm preview    # Sirve el build para vista previa
pnpm lint       # Ejecuta ESLint
pnpm lint:fix   # Corrige errores de lint automáticamente
pnpm format     # Formatea con Prettier
```

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Configuración de Axios, interceptores, helpers de error
├── auth/                   # Pantallas y layouts de login/registro
├── calendar/               # Módulos de calendario
├── components/             # Componentes reutilizables
├── context/                # Contextos globales
├── hooks/                  # Custom hooks
├── layouts/                # Layouts generales (ej. RootLayout)
├── pages/                  # Páginas principales
├── router/                 # Rutas y guards
├── store/                  # Redux Toolkit (slices, thunks, store)
├── styles/                 # Estilos globales y temas
├── types/                  # Tipado compartido
└── main.tsx / TodoApp.tsx  # Entrypoints
```

## 🔐 Seguridad y control de rutas

El sistema de rutas está reforzado para evitar accesos indebidos:

### ✅ Rutas protegidas (`PrivateRoute`)
- Verifican tanto el estado de autenticación (`AUTH_STATUS`) como la presencia real de un `accessToken`.
- Si el usuario no está autenticado o no tiene token, es redirigido a `/auth/login`.

### 🚫 Rutas públicas (`PublicRoute`)
- Evitan que un usuario autenticado acceda a `/auth/*`.
- Si hay token válido, redirige automáticamente a `/home`.

### 🧠 Importancia
Este enfoque evita errores críticos como:
- Acceso a rutas privadas sin token válido.
- Usuarios logueados entrando al login.

Todo esto se implementa con `useAppSelector` directamente desde el `authSlice`, lo que asegura consistencia con Redux y persistencia del estado.

## 🧪 Testing

Actualmente no hay pruebas automatizadas, pero se recomienda integrar **Vitest** y **React Testing Library**.

## 🧠 Notas

- El frontend está preparado para usar temas (claro/oscuro), toasts personalizados y navegación protegida.
- El diseño sigue principios de Material Design 3 y considera accesibilidad desde el inicio.
