import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AUTH_STATUS } from '../../../auth/constants/status'
import { IAuthResponse, IBasicUserDto } from '../../../types/dtos/auth-response'
import { checkAuthTokenThunk } from './authThunks'

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
    setCredentials: (state, { payload }: PayloadAction<IAuthResponse>) => {
      state.user = payload.user
      state.accessToken = payload.accessToken
      state.status = AUTH_STATUS.AUTHENTICATED
      state.backendErrorMessage = undefined
    },
    logout: state => {
      state.user = undefined
      state.accessToken = undefined
      state.status = AUTH_STATUS.NOT_AUTHENTICATED
      state.backendErrorMessage = undefined
    },
    onClearErrorMessage: state => {
      state.backendErrorMessage = undefined
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthTokenThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.status = AUTH_STATUS.AUTHENTICATED
        state.backendErrorMessage = undefined
      })
      .addCase(checkAuthTokenThunk.rejected, state => {
        state.status = AUTH_STATUS.NOT_AUTHENTICATED
      })
  },
})

export const { onClearErrorMessage } = authSlice.actions
