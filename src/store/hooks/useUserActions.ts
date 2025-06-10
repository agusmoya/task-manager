import { useFetchContactsQuery } from '../../services/userApi'

export const useUserActions = () => {
  const {
    data: contacts,
    isLoading: fetchingContacts,
    error: errorContacts,
    refetch: refetchContacts,
  } = useFetchContactsQuery()

  return {
    contacts,
    refetchContacts,
    fetchingContacts,
    errorContacts,
  }
}
