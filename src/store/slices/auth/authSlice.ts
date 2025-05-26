import { createSlice, isAnyOf } from '@reduxjs/toolkit'

import { loginThunk, checkAuthTokenThunk, logoutThunk, registerThunk } from './authThunks.ts'
import { AUTH_STATUS } from '../../../auth/constants/status.ts'
import { IBasicUserDto } from '../../../types/dtos/auth-response'

export interface AuthState {
  status: string
  user: IBasicUserDto | undefined
  accessToken: string | undefined
  backendErrorMessage: string | undefined
}

const initialState: AuthState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: undefined,
  accessToken: undefined,
  backendErrorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onClearErrorMessage: state => {
      state.backendErrorMessage = undefined
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(loginThunk.fulfilled, registerThunk.fulfilled, checkAuthTokenThunk.fulfilled),
        (state, { payload }) => {
          const {
            user: { id, firstName, lastName, email },
            accessToken,
          } = payload
          state.user = { id, firstName, lastName, email }
          state.accessToken = accessToken
          state.status = AUTH_STATUS.AUTHENTICATED
          state.backendErrorMessage = undefined
        }
      )
      .addMatcher(
        isAnyOf(loginThunk.pending, registerThunk.pending, checkAuthTokenThunk.pending),
        state => {
          state.status = AUTH_STATUS.CHECKING
          state.backendErrorMessage = undefined
        }
      )
      .addMatcher(
        isAnyOf(
          logoutThunk.fulfilled,
          loginThunk.rejected,
          registerThunk.rejected,
          checkAuthTokenThunk.rejected
        ),
        (state, { payload }) => {
          state.user = undefined
          state.accessToken = undefined
          state.status = AUTH_STATUS.NOT_AUTHENTICATED
          state.backendErrorMessage = payload || undefined
        }
      )
  },
})

export const { onClearErrorMessage } = authSlice.actions
