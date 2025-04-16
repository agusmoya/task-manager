import { Navigate, Route, Routes } from "react-router-dom"

import { AuthLayout } from "../auth/layout/AuthLayout.tsx"
import { CalendarLayout } from "../calendar/layouts/CalendarLayout.tsx"
import { RootLayout } from "../layouts/RootLayout.tsx"

import { PublicRoute } from "./PublicRoute.tsx"
import { PrivateRoute } from "./PrivateRoute.tsx"
import { NotFoundPage } from "./404Page/NotFoundPage.tsx"


export const AppRouter = () => {
  return (
    // ROUTES -> con <Routes />
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/auth/*"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      {/* PRIVATE ROUTES */}
      <Route path="/calendar/*"
        element={
          <PrivateRoute>
            <CalendarLayout />
          </PrivateRoute>
        }
      />
      <Route path="/home/*"
        element={
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        }
      />
      {/* ANY OTHER ROUTE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

// TODO: Find out how to manipulate the location to make animated transitions between pages.
// ROUTES -> con <Outlet />
// For Animation pages managment
// <Route path="/auth" element={<PublicRoute><AuthLayout /></PublicRoute>}>
//   <Route index element={<Navigate to="/auth/login" replace />} />
//   <Route path="login" element={<LoginPage />} />
//   <Route path="register" element={<RegisterPage />} />
//   <Route path="*" element={<Navigate to="/auth/login" replace />} />
// </Route>
