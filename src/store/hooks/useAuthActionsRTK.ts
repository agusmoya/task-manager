import { useCallback, useMemo } from 'react'

import { useAppSelector } from '../reduxStore'
import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
} from '../../api/RTKQuery/authApi'
import { LoginRequest } from '../../types/login-request'
import { RegisterRequest } from '../../types/register-request'
import { getErrorMessage } from '../../api/helpers/getErrorMessage'

export const useAuthActions = () => {
  const { status, user } = useAppSelector(state => state.auth)

  const [loginTrigger, { isLoading: loginLoading, error: loginError }] = useLoginMutation()
  const [registerTrigger, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation()
  const [refreshTrigger, { error: refreshError }] = useRefreshMutation()
  const [logoutTrigger] = useLogoutMutation()

  const rawError = useMemo(() => {
    return loginError ?? registerError ?? refreshError
  }, [loginError, registerError, refreshError])

  const errorMessage = getErrorMessage(rawError)

  const login = useCallback((creds: LoginRequest) => loginTrigger(creds).unwrap(), [loginTrigger])
  const register = useCallback(
    (form: RegisterRequest) => registerTrigger(form).unwrap(),
    [registerTrigger]
  )
  const refresh = useCallback(() => refreshTrigger().unwrap(), [refreshTrigger])
  const logout = useCallback(() => logoutTrigger().unwrap(), [logoutTrigger])

  return {
    status,
    user,
    login,
    logout,
    refresh,
    register,
    loginLoading,
    registerLoading,
    errorMessage,
  }
}
