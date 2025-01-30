import { Navigate, Route, Routes } from "react-router-dom";
import { TaskManagerRoutes } from "../task-manager/routes/TaskManagerRoutes";
import { AuthRoutes } from "../auth/AuthRoutes";


export const AppRouter = () => {
  const authStatus = "not-authenticated";

  return (
    <Routes>
      {
        (authStatus === "not-authenticated")
          ? <Route path="/auth/*" element={<AuthRoutes />} />
          : <Route path="/*" element={<TaskManagerRoutes />} />
      }
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
