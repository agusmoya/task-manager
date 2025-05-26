import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from './reduxStore.ts'

import { fetchContactsThunk } from '../slices/user/userThunks.ts'

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  const { users, backendErrorMessage, loading } = useAppSelector(state => state.user)

  const fetchContacts = useCallback(async () => {
    try {
      await dispatch(fetchContactsThunk()).unwrap()
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  return {
    //* Properties
    users,
    backendErrorMessage,
    loading,
    //* Methods
    fetchContacts,
  }
}
