import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { Loader } from '../components/loader-page/Loader.tsx'

import { AUTH_STATUS } from '../auth/constants/status.ts'
import { useAppSelector } from '../store/hooks/reduxStore.ts'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  if (status === AUTH_STATUS.CHECKING) {
    return <Loader />
  }

  if (status === AUTH_STATUS.AUTHENTICATED && accessToken) {
    return <Navigate to="/home" replace />
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>
}
