import axios from "axios"

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { onClearErrorMessage, onChecking, onLogin, onLogout } from "../slices/auth/authSlice.ts"
import todoApi from "../../api/taskManagerApi.ts"

interface RegisterProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginProps {
  email: string
  password: string
}

export const useAuthActions = () => {
  const dispatch = useAppDispatch()
  const { status, user, backendErrorMessage } = useAppSelector(state => state.auth)

  const startLogin = async ({ email, password }: LoginProps) => {
    dispatch(onChecking())
    try {
      const { data } = await todoApi.post("/auth/login", { email, password })
      dispatch(onLogin({
        uid: data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accessToken: data.accessToken,
      }))
    } catch (error) {
      manageError(error)
    }
  }

  const startLogout = async () => {
    try {
      await todoApi.post('/auth/logout')
    } finally {
      localStorage.removeItem('breadcrumb')
      localStorage.removeItem("token-init-time")
      dispatch(onLogout('Session closed.'))
      handleClearErrorMessage()
    }
  }

  const startRegister = async ({ firstName, lastName, email, password }: RegisterProps) => {
    dispatch(onChecking())
    try {
      const { data } = await todoApi.post("/auth/register", { firstName, lastName, email, password })
      dispatch(onLogin({
        uid: data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accessToken: data.token,
      }))
    } catch (error) {
      manageError(error)
    }
  }

  const checkAuthToken = async () => {
    try {
      const { data } = await todoApi.post("/auth/refresh")
      const { uid, firstName, lastName, email, accessToken } = data
      dispatch(onLogin({ uid, firstName, lastName, email, accessToken }))
    } catch (error) {
      console.error("Error renewing token:", error)
      dispatch(onLogout("Token expired or invalid. Please, log in again."))
    }
  }

  const manageError = (responseError: unknown) => {
    if (
      axios.isAxiosError(responseError)
      && responseError.response
      && responseError.response.data
    ) {
      const { errors, msg } = responseError.response.data
      let errorMessage = ''
      if (errors) {
        errorMessage = errors[0].msg
      } else if (msg) {
        errorMessage = msg
      } else {
        console.error(responseError)
        errorMessage = 'An unexpected axios error occurred.'
      }
      dispatch(onLogout(errorMessage))
    } else {
      console.error(responseError)
      dispatch(onLogout('An unexpected error occurred.'))
    }
    handleClearErrorMessage()
  }

  const handleClearErrorMessage = () => {
    setTimeout(() => {
      dispatch(onClearErrorMessage())
    }, 10000)
  }

  return {
    //* Properties:
    status,
    user,
    backendErrorMessage,
    //* Methods:
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }
}
