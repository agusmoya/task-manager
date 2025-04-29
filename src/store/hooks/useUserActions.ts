import axios from "axios"

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"

import { onFetchUsers } from "../slices/users/userSlice"
import { onClearErrorMessage } from "../slices/category/taskCategorySlice.ts"

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  const { users, backendErrorMessage, loading } = useAppSelector((state) => state.users)

  const getUsers = () => {
    try {
      dispatch(onFetchUsers())
    } catch (error) {
      manageBackendError(error)
    }
  }

  const manageBackendError = (responseError: unknown) => {
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
        errorMessage = 'An unexpected axios error occurred.'
        console.error(errorMessage, responseError)
      }
    } else {
      console.error(responseError)
    }
    clearErrorMessage()
  }

  const clearErrorMessage = () => {
    setTimeout(() => {
      dispatch(onClearErrorMessage())
    }, 5000)
  }

  return {
    //* Properties
    users,
    backendErrorMessage,
    loading,
    //* Methods
    getUsers,
  }
}
