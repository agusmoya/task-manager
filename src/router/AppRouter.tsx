import { Route, Routes } from "react-router-dom"
import { TaskManagerRoutes } from "../task-manager/routes/TaskManagerRoutes"

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login y Registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* TaskManagerApp */}
      <Route path="/*" element={<TaskManagerRoutes />} />
    </Routes>
  )
}