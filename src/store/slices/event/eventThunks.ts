import { createAsyncThunk } from '@reduxjs/toolkit'

import { type IEvent } from '../../../types/event'

import todoApi from '../../../api/taskManagerApi'
import { handlerApiError } from '../../../api/helpers/handlerApiError'

export const fetchEventsByUserIdThunk = createAsyncThunk<IEvent[], void, { rejectValue: string }>(
  'events/fetchByUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get<IEvent[]>('/events/by-user')
      return data
    } catch (err) {
      const { message } = handlerApiError(err)
      return thunkAPI.rejectWithValue(message ?? 'Error fetching events.')
    }
  }
)
