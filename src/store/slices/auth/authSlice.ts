import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AUTH_STATUS } from '../../../auth/constants/status';


export interface LoginUserResponse {
  name: string;
  uid: string;
}

export interface AuthState {
  status: string;
  user: LoginUserResponse | undefined;
  errorMessage: string | undefined;
}

const initialState: AuthState = {
  status: 'checking',
  user: undefined,
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      console.log('CHECKING')
      state.status = AUTH_STATUS.CHECKING
      state.user = undefined
      state.errorMessage = undefined
    },
    onLogin: (state, { payload }: PayloadAction<LoginUserResponse>) => {
      console.log('LOGIN: ', payload)
      state.status = AUTH_STATUS.AUTHORIZED
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      console.log('onLogout: ', payload)
      state.status = AUTH_STATUS.UNAUTHORIZED
      state.user = undefined
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
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
