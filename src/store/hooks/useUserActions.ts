import { useAppDispatch, useAppSelector } from "./reduxStore.ts"

import { onFetchUsers } from "../slices/user/userSlice.ts"

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  const { users, backendErrorMessage, loading } = useAppSelector((state) => state.user)

  const getUsers = async () => {
    try {
      await dispatch(onFetchUsers()).unwrap()
    } catch (error) {
      console.error(error)
    }
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
