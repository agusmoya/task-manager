import axios from "axios"

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../slices/auth/authSlice.ts"
import todoApi from "../../api/taskManagerApi.ts"

interface RegisterProps {
  name: string;
  surname: string;
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
      manageError(error)
    }
  }

  const startRegister = async ({ name, surname, email, password }: RegisterProps) => {
    dispatch(onChecking())
    try {
      const { data } = await todoApi.post("/auth/register", { name, surname, email, password })
      saveTokenLocalStorage(data.token)
      dispatch(onLogin({ name, uid: data.uid }))
    } catch (error) {
      manageError(error)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token")
    // if (!token) return dispatch(onLogout('Token not found.'))
    if (!token) return

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
    if (!token) return
    // return dispatch(onLogout('Token not found LS.'))
    localStorage.setItem("token", token)
    localStorage.setItem("token-init-date", new Date().getTime().toString())
  }

  const startLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("token-init-date")
    // dispatch(onLogout('no-token'))
  }

  const manageError = (responseError: unknown) => {
    if (axios.isAxiosError(responseError) && responseError.response && responseError.response.data) {
      const { errors, msg } = responseError.response.data
      let errorMessage = ''
      // console.log(errors, error);

      if (errors) {
        errorMessage = errors[0].msg
      } else if (msg) {
        errorMessage = msg
      } else {
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
    errorMessage,
    //* Methods:
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }
}