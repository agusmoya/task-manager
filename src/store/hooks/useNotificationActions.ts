import { useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'

import {
  useGetUserNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from '../../services/notificationApi'

import { useAppSelector } from '../reduxStore'
import { getErrorMessage, OperationError } from '../../api/helpers/getErrorMessage'

/**
 * Custom hook for managing notification-related state and operations
 * Centralizes notification data, loading states, and error handling
 * @param page - Current page for pagination (default: 1)
 * @param limit - Items per page (default: 10)
 * @param filters - Optional filters for notifications
 * @returns Notification actions, data, loading states, and error handling
 */
export const useNotificationActions = (
  page: number = 1,
  limit: number = 10,
  filters?: { read?: boolean; type?: string }
) => {
  const { accessToken } = useAppSelector(state => state.auth)

  // Convert page-based pagination to offset-based for backend compatibility
  const offset = (page - 1) * limit

  // Queries - only execute if user is authenticated
  const {
    data: notifications = [],
    isLoading: fetchingNotifications,
    error: fetchNotificationsError,
    refetch: refetchNotifications,
  } = useGetUserNotificationsQuery(accessToken ? { limit, offset, ...filters } : skipToken)

  const {
    data: unreadCountData,
    isLoading: fetchingUnreadCount,
    error: fetchUnreadCountError,
    refetch: refetchUnreadCount,
  } = useGetUnreadCountQuery(accessToken ? undefined : skipToken)
  const unreadCount = unreadCountData?.unreadCount || 0
  // Mutations
  const [
    markAsRead,
    { isLoading: markingAsRead, error: markAsReadError, isSuccess: markAsReadSuccess },
  ] = useMarkAsReadMutation()

  const [
    markAllAsRead,
    { isLoading: markingAllAsRead, error: markAllAsReadError, isSuccess: markAllAsReadSuccess },
  ] = useMarkAllAsReadMutation()

  // Error handling following project pattern
  const {
    fetch: fetchNotificationError,
    fetchCount: fetchUnreadCountErrors,
    markRead: markAsReadErrors,
    markAllRead: markAllAsReadErrors,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchNotificationsError },
        { operation: OperationError.FETCH_COUNT, error: fetchUnreadCountError },
        { operation: OperationError.MARK_READ, error: markAsReadError },
        { operation: OperationError.MARK_ALL_READ, error: markAllAsReadError },
      ]),
    [fetchNotificationsError, fetchUnreadCountError, markAsReadError, markAllAsReadError]
  )

  return {
    // Data
    notifications,
    unreadCount,
    // Loading states
    fetchingNotifications,
    fetchingUnreadCount,
    markingAsRead,
    markingAllAsRead,
    // Success states
    markAsReadSuccess,
    markAllAsReadSuccess,
    // Actions
    markAsRead,
    markAllAsRead,
    refetchNotifications,
    refetchUnreadCount,
    // Errors
    fetchNotificationError,
    fetchUnreadCountErrors,
    markAsReadErrors,
    markAllAsReadErrors,
  }
}
