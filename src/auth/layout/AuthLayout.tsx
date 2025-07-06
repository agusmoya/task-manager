import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthBlob } from '../components/auth-blob/AuthBlob'

import { LoginPage, RegisterPage } from '../../router/lazy-pages'

import './AuthLayout.css'

export const AuthLayout = () => {
  return (
    <section className="auth">
      <AuthBlob />
      <div className="auth__container">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </section>
  )
}
