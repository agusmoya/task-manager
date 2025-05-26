import { createRoot } from 'react-dom/client'

import TodoApp from './TodoApp.tsx'

import './styles/styles.css'

createRoot(document.getElementById('root')!).render(<TodoApp />)
