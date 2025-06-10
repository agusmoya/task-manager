import { baseApi } from './baseApi'

import { IAuthResponse } from '../types/dtos/auth-response'
import { LoginRequest } from '../types/dtos/login'
import { RegisterRequest } from '../types/dtos/register'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IAuthResponse, LoginRequest>({
      query: creds => ({
        url: '/auth/login',
        method: 'POST',
        body: creds,
      }),
    }),
    register: builder.mutation<IAuthResponse, RegisterRequest>({
      query: form => ({
        url: '/auth/register',
        method: 'POST',
        body: form,
      }),
    }),
    refresh: builder.mutation<IAuthResponse, void>({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
  }),
  overrideExisting: false, // no sobreescribe si ya existe
})

export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useLogoutMutation } =
  authApi
