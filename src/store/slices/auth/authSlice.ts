import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import { AUTH_STATUS } from '../../../auth/constants/status'

import { authApi } from '../../../services/authApi'
import { IAuthResponseDto } from '../../../types/dtos/auth'

export interface AuthState {
  status: string
  accessToken?: string
  currentUserId?: string
}

const initialState: AuthState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  currentUserId: undefined,
  accessToken: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to update credentials from baseQueryWithReauth
    setCredentials: (state, { payload }: PayloadAction<IAuthResponseDto>) => {
      state.currentUserId = payload.userId
      state.accessToken = payload.accessToken
      state.status = AUTH_STATUS.AUTHENTICATED
    },
  },
  extraReducers: builder => {
    const { login, register, refresh } = authApi.endpoints
    builder
      .addMatcher(refresh.matchFulfilled, (state, { payload }) => {
        state.currentUserId = payload.userId
        state.accessToken = payload.accessToken
        state.status = AUTH_STATUS.AUTHENTICATED
      })
      .addMatcher(isAnyOf(login.matchFulfilled, register.matchFulfilled), (state, { payload }) => {
        state.currentUserId = payload.userId
        state.accessToken = payload.accessToken
        state.status = AUTH_STATUS.AUTHENTICATED
      })
      .addMatcher(
        isAnyOf(authApi.endpoints.refresh.matchRejected, authApi.endpoints.logout.matchFulfilled),
        state => {
          state.status = AUTH_STATUS.NOT_AUTHENTICATED
          state.currentUserId = undefined
          state.accessToken = undefined
        }
      )
  },
})

export const { setCredentials } = authSlice.actions
