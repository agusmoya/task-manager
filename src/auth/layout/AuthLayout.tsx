import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthBlob } from '../components/auth-blob/AuthBlob'

import { useTransitionPage } from '../../hooks/useTransitionPage'

import { LoginPage, RegisterPage } from '../../router/lazy-pages'

import './AuthLayout.css'

export const AuthLayout = () => {
  const { displayLocation, transitionPage, handleTransitionEnd } = useTransitionPage()

  return (
    <section className="auth">
      <AuthBlob />
      <div className={`auth__container ${transitionPage}`} onAnimationEnd={handleTransitionEnd}>
        <Routes location={displayLocation}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </section>
  )
}
