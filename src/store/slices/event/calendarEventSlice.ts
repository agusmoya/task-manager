import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { type CalendarEvent } from "../../../types/calendar-event"
import todoApi from "../../../api/taskManagerApi"
import { extractBackendErrorMessage } from "../../../helpers/manageBackendError"

export interface CalendarEventsState {
  activeCalendarEvent: CalendarEvent | null
  events: CalendarEvent[]
  loading: boolean
  backendErrorMessage: string | null
}

const initialState: CalendarEventsState = {
  activeCalendarEvent: null,
  events: [],
  loading: false,
  backendErrorMessage: null,
}

export const calendarEventSlice = createSlice({
  name: "calendarEvent",
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.activeCalendarEvent = payload
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events.push(payload)
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.map(event =>
        event.id === payload.id ? payload : event
      )
    },
    onDeleteEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.filter(event =>
        event.id !== payload.id
      )
    },
    onResetEvents: (state) => {
      state.events = []
    },
  },
  extraReducers(builder) {
    builder
      // FETCH events by user id
      .addCase(onFetchEventsByUserId.pending, (state) => {
        state.loading = true
        state.backendErrorMessage = null
      })
      .addCase(onFetchEventsByUserId.fulfilled, (state, { payload }) => {
        state.events = payload
        state.loading = false
      })
      .addCase(onFetchEventsByUserId.rejected, (state, { payload }) => {
        state.loading = false
        state.backendErrorMessage = extractBackendErrorMessage(payload) || 'Error fetching events.'
      })
  }
})

export const onFetchEventsByUserId = createAsyncThunk<CalendarEvent[], void>(
  'events/by-user',
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get('/events/by-user')
      return data.events as CalendarEvent[]
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onResetEvents,

} = calendarEventSlice.actions
