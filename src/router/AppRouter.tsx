import { useEffect } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { AUTH_STATUS } from '../auth/constants/status'

import { AuthLayout } from '../auth/layout/AuthLayout'
import { CalendarLayout } from '../calendar/layouts/CalendarLayout'
import { RootLayout } from '../layouts/RootLayout'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { LoaderPage } from '../components/loader-page/LoaderPage'
import { NotFoundPage } from './404Page/NotFoundPage'

import { useAuthActions } from '../store/hooks/useAuthActions'
import { useTransitionPage } from '../hooks/useTransitionPage'
import { Header } from '../task/components/header/Header'
import { Breadcrumb } from '../components/breadcrumb/Breadcrumb'

import '../styles/transition-page.css'

export const AppRouter = () => {
  const { status, refresh } = useAuthActions()
  const { displayLocation, transitionPage, handleTransitionEnd } = useTransitionPage()

  useEffect(() => {
    refresh()
  }, [refresh])

  if (status === AUTH_STATUS.CHECKING) return <LoaderPage />

  return (
    <>
      <Header />
      {status === AUTH_STATUS.AUTHENTICATED && <Breadcrumb />}
      <main className={`main ${transitionPage}`} onAnimationEnd={handleTransitionEnd}>
        <Routes location={displayLocation} key={displayLocation.pathname}>
          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={
              status === AUTH_STATUS.AUTHENTICATED ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />
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
      </main>
    </>
  )
}
