import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { AUTH_STATUS } from '../../../auth/constants/status.ts';


export interface LoginUserResponse {
  firstName: string;
  uid: string;
}

export interface AuthState {
  status: string;
  user: LoginUserResponse | undefined;
  backendErrorMessage: string | undefined;
}

const initialState: AuthState = {
  status: AUTH_STATUS.CHECKING,
  user: undefined,
  backendErrorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = AUTH_STATUS.CHECKING
      state.user = undefined
      state.backendErrorMessage = undefined
    },
    onLogin: (state, { payload }: PayloadAction<LoginUserResponse>) => {
      state.status = AUTH_STATUS.AUTHORIZED
      state.user = payload
      state.backendErrorMessage = undefined
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = AUTH_STATUS.UNAUTHORIZED
      state.user = undefined
      state.backendErrorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.backendErrorMessage = undefined
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,

} = authSlice.actions
