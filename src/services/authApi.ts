import { baseApi } from './baseApi'

import { ILoginDto } from '../types/dtos/login'
import { IAuthResponseDto, IRegisterDto } from '../types/dtos/register'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IAuthResponseDto, ILoginDto>({
      query: creds => ({
        url: '/auth/login',
        method: 'POST',
        body: creds,
      }),
    }),
    register: builder.mutation<IAuthResponseDto, IRegisterDto>({
      query: form => ({
        url: '/auth/register',
        method: 'POST',
        body: form,
      }),
    }),
    refreshToken: builder.mutation<IAuthResponseDto, void>({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
  }),
  overrideExisting: false, // no sobreescribe si ya existe
})

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useLogoutMutation } =
  authApi
