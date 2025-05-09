import { useAppDispatch, useAppSelector } from "./reduxStore.ts"

import { onFetchContacts } from "../slices/user/userSlice.ts"

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  const { users, backendErrorMessage, loading } = useAppSelector((state) => state.user)

  const fetchContacts = async () => {
    try {
      await dispatch(onFetchContacts()).unwrap()
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
    fetchContacts,
  }
}
