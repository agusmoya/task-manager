import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import { AUTH_STATUS } from '../../../auth/constants/status'

import { IBasicUserDto } from '../../../types/dtos/user'

import { authApi } from '../../../services/authApi'
import { IAuthResponseDto } from '../../../types/dtos/register'

export interface AuthState {
  status: string
  user?: IBasicUserDto
  accessToken?: string
}

const initialState: AuthState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: undefined,
  accessToken: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Acción pura para actualizar credenciales desde baseQueryWithReauth
    setCredentials: (state, { payload }: PayloadAction<IAuthResponseDto>) => {
      state.user = payload.user
      state.accessToken = payload.accessToken
      state.status = AUTH_STATUS.AUTHENTICATED
    },
  },
  extraReducers: builder => {
    const { login, register, refresh } = authApi.endpoints
    builder
      .addMatcher(
        isAnyOf(login.matchFulfilled, register.matchFulfilled, refresh.matchFulfilled),
        (state, { payload }) => {
          state.user = payload.user
          state.accessToken = payload.accessToken
          state.status = AUTH_STATUS.AUTHENTICATED
        }
      )
      .addMatcher(
        isAnyOf(authApi.endpoints.refresh.matchRejected, authApi.endpoints.logout.matchFulfilled),
        state => {
          state.status = AUTH_STATUS.NOT_AUTHENTICATED
          state.user = undefined
          state.accessToken = undefined
        }
      )
  },
})

export const { setCredentials } = authSlice.actions
