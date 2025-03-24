import axios from "axios";

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../slices/auth/authSlice.ts"

import todoApi from "../../api/taskManagerApi.ts"

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export const useAuthActions = () => {
  const { status, user, errorMessage } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const startLogin = async ({ email, password }: LoginProps) => {
    dispatch(onChecking())
    try {
      const { data } = await todoApi.post("/auth/login", { email, password })
      saveTokenLocalStorage(data.token)
      const { name, uid } = data
      dispatch(onLogin({ name, uid }))
    } catch (error) {
      console.log({ error })
      dispatch(onLogout('Invalid credentials.'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10000)
    }
  }

  const startRegister = async ({ name, email, password }: RegisterProps) => {
    dispatch(onChecking())
    try {
      const { data } = await todoApi.post("/auth/register", { name, email, password })
      saveTokenLocalStorage(data.token)
      dispatch(onLogin({ name, uid: data.uid }))
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const responseError = error.response.data.errors ? error.response.data.errors[0] : error.response.data.error
        const errorMsg = responseError || 'Unknown error'
        dispatch(onLogout(errorMsg))
      } else {
        dispatch(onLogout('An unexpected error occurred.'))
      }
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10000)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      return dispatch(onLogout('Token not found.'))
    }

    try {
      const { data } = await todoApi.get("/auth/renew")
      saveTokenLocalStorage(data.token)
      const { name, uid } = data
      dispatch(onLogin({ name, uid }))
    } catch (error) {
      dispatch(onLogout(`Token credentials error. Error: ${error}`))
    }
  }

  const saveTokenLocalStorage = (token: string) => {
    if (!token) {
      dispatch(onLogout('No se pudo renovar el token.'))
      return
    }
    localStorage.setItem("token", token)
    localStorage.setItem("token-init-date", new Date().getTime().toString())
  }

  const startLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("token-init-date")
    dispatch(onLogout('no-token'))
  }

  return {
    //* Properties:
    status,
    user,
    errorMessage,
    //* Methods:
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }
}