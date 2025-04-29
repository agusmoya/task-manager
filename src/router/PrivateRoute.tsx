import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { Loader } from '../components/loader-page/Loader.tsx'

import { AUTH_STATUS } from '../auth/constants/status.ts'
import { useAuthActions } from '../store/hooks/useAuthActions.ts'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useAuthActions()

  if (status === AUTH_STATUS.CHECKING) {
    return <Loader />
  }

  if (status === AUTH_STATUS.NOT_AUTHENTICATED) {
    return <Navigate to="/auth/login" replace />
  }

  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  )
}
