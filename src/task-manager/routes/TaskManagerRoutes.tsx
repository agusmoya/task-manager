import { Navigate, Route, Routes } from "react-router-dom"

import { HomePage } from "../pages/HomePage.tsx"
import { DayTaskPage } from "../pages/DayTaskPage.tsx"

export const TaskManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task-day/:id" element={<DayTaskPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
