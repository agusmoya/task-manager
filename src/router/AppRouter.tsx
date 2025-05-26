import { useEffect } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthLayout } from '../auth/layout/AuthLayout.tsx'
import { CalendarLayout } from '../calendar/layouts/CalendarLayout.tsx'
import { RootLayout } from '../layouts/RootLayout.tsx'

import { PublicRoute } from './PublicRoute.tsx'
import { PrivateRoute } from './PrivateRoute.tsx'
import { Loader } from '../components/loader-page/Loader.tsx'
import { NotFoundPage } from './404Page/NotFoundPage.tsx'

import { useAuthActions } from '../store/hooks/useAuthActions.ts'
import { AUTH_STATUS } from '../auth/constants/status.ts'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthActions()

  useEffect(() => {
    checkAuthToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === AUTH_STATUS.CHECKING) {
    return <Loader />
  }

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route
        path="/auth/*"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      {/* PRIVATE ROUTES */}
      <Route
        path="/calendar/*"
        element={
          <PrivateRoute>
            <CalendarLayout />
          </PrivateRoute>
        }
      />
      <Route
        path="/home/*"
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
