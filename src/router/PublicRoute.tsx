import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { LoaderPage } from '../components/loader-page/LoaderPage'

import { AUTH_STATUS } from '../auth/constants/status'
import { useAppSelector } from '../store/reduxStore'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  if (status === AUTH_STATUS.CHECKING) {
    return <LoaderPage />
  }

  if (status === AUTH_STATUS.AUTHENTICATED && accessToken) {
    return <Navigate to="/home" replace />
  }

  return <Suspense fallback={<LoaderPage />}>{children}</Suspense>
}
