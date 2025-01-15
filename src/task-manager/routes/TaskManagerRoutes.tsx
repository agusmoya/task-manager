import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { DayTaskPage } from "../pages/DayTaskPage"

export const TaskManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task-day/:id" element={<DayTaskPage />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}