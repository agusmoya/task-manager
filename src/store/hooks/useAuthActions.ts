import { useCallback, useMemo } from 'react'

import { useAppSelector } from '../reduxStore'
import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
} from '../../services/authApi'
import { LoginRequest } from '../../types/dtos/login'
import { IRegisterDto } from '../../types/dtos/register'
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

  const login = useCallback(
    (creds: LoginRequest) => {
      try {
        loginTrigger(creds).unwrap()
      } catch (error) {
        console.error('Auth login error: ', error)
      }
    },
    [loginTrigger]
  )

  const register = useCallback(
    (form: IRegisterDto) => {
      try {
        registerTrigger(form).unwrap()
      } catch (error) {
        console.error('Auth register error: ', error)
      }
    },
    [registerTrigger]
  )

  const refresh = useCallback(() => {
    try {
      refreshTrigger().unwrap()
    } catch (error) {
      console.error('Auth refresh error: ', error)
    }
  }, [refreshTrigger])
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
