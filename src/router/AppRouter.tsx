import { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/AuthRoutes.tsx";
import { CalendarRoutes } from "../calendar/CalendarRoutes.tsx";
import { TaskManagerRoutes } from "../task-manager/routes/TaskManagerRoutes.tsx";

import { useAuthActions } from "../store/hooks/useAuthActions.ts";
import { AUTH_STATUS } from "../auth/constants/status.ts";


export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthActions()

  useEffect(() => {
    checkAuthToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      {
        (status === AUTH_STATUS.UNAUTHORIZED || status === AUTH_STATUS.CHECKING)
          ? (
            <>
              <Route path="/auth/*" element={<AuthRoutes />} />
              <Route path="*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/calendar/*" element={<CalendarRoutes />} />
              <Route path="/*" element={<TaskManagerRoutes />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>
  )
}
