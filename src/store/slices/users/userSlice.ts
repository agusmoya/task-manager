import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { AxiosError } from "axios"

import { type User } from '../../../types/user.d'

import todoApi from "../../../api/taskManagerApi.ts"


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
    onClearErrorMessage: (state) => {
      state.backendErrorMessage = undefined
    }
  },
  extraReducers(builder) {
    // FETCH
    builder.
      addCase(onFetchUsers.pending, (state) => {
        state.loading = true
        state.backendErrorMessage = undefined
      })
      .addCase(onFetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload
        state.loading = false
      })
      .addCase(onFetchUsers.rejected, (state, { payload }) => {
        state.loading = false
        state.backendErrorMessage = payload as string
      })
  }
})


export const onFetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const res = await todoApi.get('/user')
      return res.data.users as User[]
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error fetching users')
    }
  }
)

export const {
  onClearErrorMessage,

} = userSlice.actions
