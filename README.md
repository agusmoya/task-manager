# 🎯 Todo App Frontend (React + Vite + TypeScript)

Este es el frontend de una aplicación de gestión de tareas (Todo App), desarrollado con **React 18**, **TypeScript**, **Vite** y **Redux Toolkit**. Está estructurado de forma moderna, con enfoque profesional, control de calidad de código y soporte para temas, rutas protegidas y manejo avanzado de autenticación con tokens.

## 📦 Stack

- **React 18** con **TypeScript**
- **Vite 6** como bundler
- **Redux Toolkit** para manejo de estado global
- **React Router DOM** para rutas
- **Axios** con interceptores para autenticación automática
- **ESLint** (configuración moderna)
- **Prettier** para formateo automático

---

- 🛠 Instalación

```bash
pnpm install
pnpm dev        # Inicia la app en modo desarrollo
pnpm build      # Compila la app para producción
pnpm preview    # Sirve el build localmente
pnpm lint       # Ejecuta ESLint sobre el proyecto
```

- 📁 Estructura del Proyecto
├── src/
│   ├── assets/             # Recursos estáticos (imágenes, íconos, etc.)
│   ├── components/         # Componentes reutilizables
│   ├── context/            # Proveedores de contexto (navegación, temas, etc.)
│   ├── helpers/            # Funciones auxiliares
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Vistas principales de la app
│   ├── router/             # Definición de rutas y navegación
│   ├── store/              # Redux Toolkit slices y configuración
│   ├── styles/             # Estilos globales y temas
│   ├── api/                # Configuración de axios (`taskManagerApi.ts`)
│   ├── TodoApp.tsx         # Componente raíz
│   └── main.tsx            # Punto de entrada
├── public/                 # Archivos estáticos públicos
├── .eslintrc.js            # Configuración de ESLint moderna (Flat config)
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
└── README.md

- 🔐 Variables de Entorno:

VITE_API_URL=http://localhost:3000/api

- ✨ Estilo de Código

* Comillas simples (')

* Sin punto y coma (;)

* Ancho máximo de línea: 100

* ESLint + Prettier integrados

* Soporte para hooks y exportación optimizada con react-refresh

📦 Usa extensiones como ESLint y Prettier en VSCode para formato y errores automáticos al guardar.

- 🧪 Tests:

Actualmente no hay pruebas automatizadas, pero se implementaran con Vitest o React Testing Library en una fase futura.