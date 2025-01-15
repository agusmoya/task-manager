import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'

import TaskManagerApp from './TaskManagerApp.tsx'

const v7DocDisabledWarnings = { v7_startTransition: true, v7_relativeSplatPath: true }

createRoot(document.getElementById('root')!).render(
  <BrowserRouter future={v7DocDisabledWarnings}>
    <TaskManagerApp />
  </BrowserRouter>
)
