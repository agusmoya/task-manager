import { createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AUTH_STATUS } from '../../../auth/constants/status'
import { IBasicUserDto } from '../../../types/dtos/auth-response'

import { authApi } from '../../../services/authApi'

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.register.matchFulfilled,
          authApi.endpoints.refresh.matchFulfilled
        ),
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
