import { createRoot } from 'react-dom/client'
import './index.css'

import TaskManagerApp from './TaskManagerApp.tsx'
// import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <TaskManagerApp />
    // </StrictMode>
)
