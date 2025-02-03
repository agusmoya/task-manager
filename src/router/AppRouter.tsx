import { Navigate, Route, Routes } from "react-router-dom";
import { TaskManagerRoutes } from "../task-manager/routes/TaskManagerRoutes";
import { AuthRoutes } from "../auth/AuthRoutes";
import { CalendarRoutes } from "../calendar/CalendarRoutes";


export const AppRouter = () => {
  // const authStatus = "not-authenticated";

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/calendar/*" element={<CalendarRoutes />} />
      <Route path="/*" element={<TaskManagerRoutes />} />
      {/* {
        (authStatus === "not-authenticated")
          ? <Route path="/auth/*" element={<AuthRoutes />} />
          : <Route path="/*" element={<TaskManagerRoutes />} />
      } */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
