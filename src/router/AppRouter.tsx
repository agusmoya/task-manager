import { useEffect } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { AUTH_STATUS } from '../auth/constants/status'

import { AuthLayout } from '../auth/layout/AuthLayout'
import { CalendarLayout } from '../calendar/layouts/CalendarLayout'
import { RootLayout } from '../layouts/RootLayout'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { Loader } from '../components/loader-page/Loader'
import { NotFoundPage } from './404Page/NotFoundPage'

import { useAuthActions } from '../store/hooks/useAuthActions'

export const AppRouter = () => {
  const { status, refresh } = useAuthActions()

  useEffect(() => {
    refresh()
  }, [refresh])

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
        path="/home/calendar/*"
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
