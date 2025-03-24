import { createRoot } from 'react-dom/client'
import './styles.css'

import TaskManagerApp from './TaskManagerApp.tsx'
// import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <TaskManagerApp />
    // </StrictMode>
)
