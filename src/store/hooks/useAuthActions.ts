import axios from "axios"

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../slices/auth/authSlice.ts"
import todoApi from "../../api/taskManagerApi.ts"

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export const useAuthActions = () => {
  const { status, user, backendErrorMessage } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const startLogin = async ({ email, password }: LoginProps) => {
    dispatch(onChecking())
    try {
      const { data } = await todoApi.post("/auth/login", { email, password })
      saveTokenLocalStorage(data.token)
      const { firstName, uid } = data
      dispatch(onLogin({ firstName, uid }))
    } catch (error) {
      manageError(error)
    }
  }

  const startRegister = async ({ firstName, lastName, email, password }: RegisterProps) => {
    dispatch(onChecking())
    try {
      const { data } = await todoApi.post("/auth/register", { firstName, lastName, email, password })
      saveTokenLocalStorage(data.token)
      dispatch(onLogin({ firstName: data.firstName, uid: data.uid }))
    } catch (error) {
      manageError(error)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token")
    if (!token) return
    try {
      const { data } = await todoApi.get("/auth/renew")
      saveTokenLocalStorage(data.token)
      const { firstName, uid } = data
      dispatch(onLogin({ firstName, uid }))
    } catch (error) {
      dispatch(onLogout(`Token credentials error. Error: ${error}`))
    }
  }

  const saveTokenLocalStorage = (token: string) => {
    if (!token) return
    localStorage.setItem("token", token)
    localStorage.setItem("token-init-date", new Date().getTime().toString())
  }

  const startLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("token-init-date")
    dispatch(onLogout())
  }

  const manageError = (responseError: unknown) => {
    if (axios.isAxiosError(responseError) && responseError.response && responseError.response.data) {
      const { errors, msg } = responseError.response.data
      let errorMessage = ''
      if (errors) {
        errorMessage = errors[0].msg
      } else if (msg) {
        errorMessage = msg
      } else {
        console.log(responseError)
        errorMessage = 'An unexpected axios error occurred.'
      }
      dispatch(onLogout(errorMessage))
    } else {
      dispatch(onLogout('An unexpected error occurred.'))
    }
    setTimeout(() => {
      dispatch(clearErrorMessage())
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