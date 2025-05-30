import { createRoot } from 'react-dom/client'

import TodoApp from './TodoApp'

import './styles/styles.css'

createRoot(document.getElementById('root')!).render(<TodoApp />)
