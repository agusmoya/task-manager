import { createAsyncThunk } from '@reduxjs/toolkit'

import { type User } from '../../../types/user.d'

import todoApi from '../../../api/taskManagerApi.ts'
import { handlerApiError } from '../../../api/helpers/handlerApiError.ts'

export const fetchContactsThunk = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get<User[]>('/user/contacts')
      return data
    } catch (error) {
      const { errorMessage } = handlerApiError(error)
      return thunkAPI.rejectWithValue(errorMessage ?? 'Error fetching contacts.')
    }
  }
)
