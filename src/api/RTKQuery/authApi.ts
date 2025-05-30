import { baseApi } from './baseApi'

import { IAuthResponse } from '../../types/dtos/auth-response'
import { LoginRequest } from '../../types/login-request'
import { RegisterRequest } from '../../types/register-request'
import { authSlice } from '../../store/slices/auth/authSlice'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IAuthResponse, LoginRequest>({
      query: creds => ({
        url: '/auth/login',
        method: 'POST',
        body: creds,
      }),
      // 1️⃣ Cuando login tiene éxito, guardamos user+token
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(authSlice.actions.setCredentials(data))
      },
    }),
    register: builder.mutation<IAuthResponse, RegisterRequest>({
      query: form => ({
        url: '/auth/register',
        method: 'POST',
        body: form,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(authSlice.actions.setCredentials(data))
      },
    }),
    refresh: builder.mutation<IAuthResponse, void>({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(authSlice.actions.setCredentials(data))
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(authSlice.actions.logout())
      },
    }),
  }),
  overrideExisting: false, // no sobreescribe si ya existe
})

export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useLogoutMutation } =
  authApi
