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

// BaseQuery que detecta 401 y dispara refresh automáticamente
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // Puede ser URL simple o FetchArgs
  unknown, // El tipo por defecto de respuesta (no lo forzamos aquí)
  FetchBaseQueryError // Tipo de error
> = async (args, api, extraOptions) => {
  // 1️⃣ Petición original
  let result = await baseQuery(args, api, extraOptions)

  let url = ''
  if (typeof args !== 'string' && args.url) {
    url = args.url
  }
  // 2️⃣ Si recibimos 401, intentamos refresh
  if (result.error?.status === 401 && !isAuthPath(url)) {
    const rawData = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions)

    const refreshResult = rawData as QueryReturnValue<IAuthResponseDto, FetchBaseQueryError>
    if (refreshResult.data) {
      // 3️⃣ Guardamos credenciales y reintentamos original
      api.dispatch(setCredentials(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      // 4️⃣ Si refresh falla, forzamos logout
      await api.dispatch(authApi.endpoints.logout.initiate())
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Task', 'Event', 'Category', 'User'] as const,
  endpoints: () => ({}),
})
