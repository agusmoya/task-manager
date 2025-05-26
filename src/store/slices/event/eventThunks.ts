import { createAsyncThunk } from '@reduxjs/toolkit'

import { type CalendarEvent } from '../../../types/calendar-event.d'

import todoApi from '../../../api/taskManagerApi.ts'
import { handlerApiError } from '../../../api/helpers/handlerApiError.ts'

export const fetchEventsByUserIdThunk = createAsyncThunk<
  CalendarEvent[],
  void,
  { rejectValue: string }
>('events/fetchByUser', async (_, thunkAPI) => {
  try {
    const { data } = await todoApi.get<{ events: CalendarEvent[] }>('/events/by-user')
    return data.events
  } catch (err) {
    const { errorMessage } = handlerApiError(err)
    return thunkAPI.rejectWithValue(errorMessage ?? 'Error fetching events.')
  }
})
