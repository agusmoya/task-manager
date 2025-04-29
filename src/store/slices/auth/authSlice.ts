import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { AUTH_STATUS } from '../../../auth/constants/status.ts'


export interface LoginUserResponse {
  uid: string
  firstName: string
  lastName: string
  email: string
}

export interface AuthState {
  status: string
  user: LoginUserResponse | undefined
  accessToken: string | undefined
  backendErrorMessage: string | undefined
}

const initialState: AuthState = {
  status: AUTH_STATUS.CHECKING,
  user: undefined,
  accessToken: undefined,
  backendErrorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.user = undefined
      state.backendErrorMessage = undefined
      state.status = AUTH_STATUS.CHECKING
    },
    onLogin: (state, { payload }: PayloadAction<LoginUserResponse & { accessToken: string }>) => {
      state.user = {
        uid: payload.uid,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
      }
      state.accessToken = payload.accessToken
      state.backendErrorMessage = undefined
      state.status = AUTH_STATUS.AUTHENTICATED
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.user = undefined
      state.accessToken = undefined
      state.backendErrorMessage = payload
      state.status = AUTH_STATUS.NOT_AUTHENTICATED
    },
    onClearErrorMessage: (state) => {
      state.backendErrorMessage = undefined
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  onChecking,
  onLogin,
  onLogout,
  onClearErrorMessage,

} = authSlice.actions
