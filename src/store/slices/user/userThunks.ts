import { createAsyncThunk } from '@reduxjs/toolkit'

import { type IUser } from '../../../types/user.d'

import todoApi from '../../../api/taskManagerApi'
import { handlerApiError } from '../../../api/helpers/handlerApiError'

export const fetchContactsThunk = createAsyncThunk<IUser[], void, { rejectValue: string }>(
  'users/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get<IUser[]>('/users/contacts')
      return data
    } catch (err) {
      const { message } = handlerApiError(err)
      return thunkAPI.rejectWithValue(message ?? 'Error fetching contacts.')
    }
  }
)
