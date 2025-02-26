import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/AuthRoutes.tsx";
import { CustomCalendarRoutes } from "../custom-calendar/CustomCalendarRoutes.tsx";
import { TaskManagerRoutes } from "../task-manager/routes/TaskManagerRoutes.tsx";


export const AppRouter = () => {
  // const authStatus = "not-authenticated";

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/calendar/*" element={<CustomCalendarRoutes />} />
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
