import { Route, Routes } from "react-router-dom"
import { AppRoutes } from "../task-manager/routes/AppRoutes"

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login y Registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* TaskManagerApp */}
      <Route path="/*" element={<AppRoutes />} />
    </Routes>
  )
}