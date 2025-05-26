import { useCallback } from 'react'

import { type LoginUserRequest } from '../../types/login-request.d'
import { type RegisterUserRequest } from '../../types/register-request.d'

import { useAppDispatch, useAppSelector } from './reduxStore.ts'
import {
  checkAuthTokenThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from '../slices/auth/authThunks.ts'

export const useAuthActions = () => {
  const dispatch = useAppDispatch()
  const { status, user, backendErrorMessage } = useAppSelector(state => state.auth)

  const login = useCallback(
    async (credentials: LoginUserRequest) => {
      try {
        await dispatch(loginThunk(credentials)).unwrap()
        // localStorage.setItem('token-init-time', Date.now().toString())
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
    [dispatch]
  )

  const register = useCallback(
    async (formData: RegisterUserRequest) => {
      try {
        await dispatch(registerThunk(formData)).unwrap()
        // localStorage.setItem('token-init-time', Date.now().toString())
      } catch (error) {
        console.error('Register failed:', error)
      }
    },
    [dispatch]
  )

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutThunk()).unwrap()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      localStorage.removeItem('breadcrumb')
      localStorage.removeItem('token-init-time')
    }
  }, [dispatch])

  const checkAuthToken = useCallback(async () => {
    try {
      await dispatch(checkAuthTokenThunk())
      // localStorage.setItem('token-init-time', Date.now().toString())
    } catch (error) {
      console.error('Token refresh failed:', error)
    }
  }, [dispatch])

  return {
    //* Properties:
    status,
    user,
    backendErrorMessage,
    //* Methods:
    login,
    logout,
    register,
    checkAuthToken,
  }
}
