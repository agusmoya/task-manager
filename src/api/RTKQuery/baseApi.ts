import {
  createApi,
  fetchBaseQuery,
  QueryReturnValue,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import type { RootState } from '../../store/store'
import { authSlice } from '../../store/slices/auth/authSlice'
import { IAuthResponse } from '../../types/dtos/auth-response'

const baseQuery = fetchBaseQuery({
  credentials: 'include', // para cookies HttpOnly de refresh
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
  // 1️⃣ Llamada normal
  let result = await baseQuery(args, api, extraOptions)
  console.log('Base query result:', result)

  // 2️⃣ Si recibimos 401, intentamos refresh
  if (result.error?.status === 401) {
    const rawRefreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )
    const refreshResult = rawRefreshResult as QueryReturnValue<IAuthResponse, FetchBaseQueryError>
    if (refreshResult.data) {
      // 3️⃣ Guardamos credenciales y reintentamos original
      api.dispatch(authSlice.actions.setCredentials(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      // 4️⃣ Si refresh falla, forzamos logout
      api.dispatch(authSlice.actions.logout())
    }
  }
  return result
}

// Slice vacío para inyectar endpoints más tarde
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Category', 'Task', 'Auth'], // Puedes añadir más tipos de tags según tus necesidades
  endpoints: () => ({}),
})
