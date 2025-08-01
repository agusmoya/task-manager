import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { LoaderPage } from '../components/loader-page/LoaderPage'

import { AUTH_STATUS } from '../auth/constants/status'
import { useAppSelector } from '../store/reduxStore'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  if (status === AUTH_STATUS.CHECKING) return <LoaderPage />

  if (status === AUTH_STATUS.NOT_AUTHENTICATED || !accessToken) {
    return <Navigate to="/auth/login" replace />
  }

  return <Suspense fallback={<LoaderPage />}>{children}</Suspense>
}
