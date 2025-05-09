import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { type User } from '../../../types/user.d'

import todoApi from "../../../api/taskManagerApi.ts"
import { extractBackendErrorMessage } from "../../../helpers/manageBackendError.ts"


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
      addCase(onFetchContacts.pending, (state) => {
        state.loading = true
        state.backendErrorMessage = undefined
      })
      .addCase(onFetchContacts.fulfilled, (state, { payload }) => {
        state.users = payload
        state.loading = false
      })
      .addCase(onFetchContacts.rejected, (state, { payload }) => {
        state.loading = false
        state.backendErrorMessage = extractBackendErrorMessage(payload) || 'Error fetching contacts.'
      })
  }
})


export const onFetchContacts = createAsyncThunk(
  'users/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const res = await todoApi.get('/user/contacts')
      return res.data.users as User[]
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const {
  onClearErrorMessage,

} = userSlice.actions
