import { Route, Routes } from 'react-router-dom'

import { HomePage, TaskFormPage, TaskPage } from '../router/lazy-pages'

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="task-form" element={<TaskFormPage />} />
        <Route path="task-form/:id" element={<TaskFormPage />} />
        {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
      </Routes>
    </div>
  )
}
