import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { Loader } from '../components/loader-page/Loader.tsx'

import { AUTH_STATUS } from '../auth/constants/status.ts'
import { useAuthActions } from '../store/hooks/useAuthActions.ts'

interface Props {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: Props) => {
  const { status } = useAuthActions()

  if (status === AUTH_STATUS.CHECKING) {
    return <Loader />
  }

  if (status === AUTH_STATUS.AUTHENTICATED) {
    return <Navigate to="/home" replace />
  }

  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  )
}
