import { useMemo } from 'react'

import { useAppSelector } from '../reduxStore'
import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
} from '../../services/authApi'

import { getErrorMessage, OperationError } from '../../api/helpers/getErrorMessage'

export const useAuthActions = () => {
  const { status, user } = useAppSelector(state => state.auth)

  const [logout, { isLoading: logoutLoading, error: logoutError }] = useLogoutMutation()
  const [login, { isLoading: loginLoading, error: loginError }] = useLoginMutation()
  const [register, { isLoading: registerLoading, error: registerError }] = useRegisterMutation()
  const [refresh, { error: refreshError }] = useRefreshMutation()

  const {
    login: loginAuthError,
    register: registerAuthError,
    refresh: refreshAuthError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.LOGIN, error: loginError },
        { operation: OperationError.REGISTER, error: registerError },
        { operation: OperationError.REFRESH, error: refreshError },
      ]),
    [loginError, registerError, refreshError]
  )

  return {
    // STATE
    status,
    user,
    // Data y flags RTKQ
    loginLoading,
    registerLoading,
    logoutLoading,
    // Mutations RTKQ
    logout,
    login,
    register,
    refresh,
    // RTKQ errors
    loginAuthError,
    registerAuthError,
    refreshAuthError,
    logoutError,
  }
}
