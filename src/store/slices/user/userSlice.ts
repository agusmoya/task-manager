import { createSlice } from '@reduxjs/toolkit'

import { type User } from '../../../types/user.d'

import { fetchContactsThunk } from './userThunks.ts'

interface UserState {
  users: User[]
  loading: boolean
  backendErrorMessage: string | undefined
}

const initialState: UserState = {
  users: [],
  loading: false,
  backendErrorMessage: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onClearErrorMessage: state => {
      state.backendErrorMessage = undefined
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContactsThunk.pending, state => {
        state.loading = true
        state.backendErrorMessage = undefined
      })
      .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
        state.users = payload
        state.loading = false
      })
      .addCase(fetchContactsThunk.rejected, (state, { payload }) => {
        state.loading = false
        state.backendErrorMessage = payload
      })
  },
})

export const { onClearErrorMessage } = userSlice.actions
