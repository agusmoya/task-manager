import {
  createApi,
  fetchBaseQuery,
  QueryReturnValue,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { RootState } from '../store/store'

import { authApi } from './authApi'

import { IAuthResponseDto } from '../types/dtos/register'
import { setCredentials } from '../store/slices/auth/authSlice'

function isAuthPath(url?: string): boolean {
  const AUTH_PATHS = ['/auth/login', '/auth/refresh', '/auth/logout']
  return !!url && AUTH_PATHS.some(path => url.endsWith(path))
}

const baseQuery = fetchBaseQuery({
  credentials: 'include', // for HttpOnly cookies (refresh service)
  baseUrl: 'http://localhost:4000/api',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken
    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`)
    return headers
  },
})

/**
 * Promise Deduplication Pattern (Single Flight Pattern)
 * Prevents multiple simultaneous refresh calls when multiple requests receive 401
 * Only the first request executes refresh, others wait for the same promise result
 * @see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-duplicate-requests
 */
let refreshPromise: Promise<QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>> | null = null

/**
 * Promise Deduplication Pattern for logout operations
 * Prevents multiple simultaneous logout calls when refresh fails for multiple requests
 */
let logoutPromise: Promise<void> | null = null

// BaseQuery that detects 401 and triggers refresh automatically
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown, // The default response type
  FetchBaseQueryError // Error type
> = async (args, api, extraOptions) => {
  // 1. Original request
  let result = await baseQuery(args, api, extraOptions)

  let url = ''
  if (typeof args !== 'string' && args.url) {
    url = args.url
  }
  // 2. If we receive 401, we try to refresh
  if (result.error?.status === 401 && !isAuthPath(url)) {
    // If refresh is already in progress, wait for it
    if (!refreshPromise) {
      refreshPromise = baseQuery(
        { url: '/auth/refresh', method: 'POST' },
        api,
        extraOptions
      ) as Promise<QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>>
    }

    const refreshResult = await refreshPromise
    refreshPromise = null // Reset after completion

    if (refreshResult.data) {
      // 3. Save credentials and retry original request
      api.dispatch(setCredentials(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      // 4. If refresh fails, we force logout (prevent multiple logout calls)
      if (!logoutPromise) {
        logoutPromise = api.dispatch(authApi.endpoints.logout.initiate()).unwrap()
      }
      await logoutPromise
      logoutPromise = null // Reset after completion
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Task', 'Event', 'Category', 'User', 'Invitation', 'Notification'] as const,
  endpoints: () => ({}),
})
