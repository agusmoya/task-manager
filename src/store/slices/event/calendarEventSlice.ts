import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { type CalendarEvent } from "../../../types/calendar-event.d"

import todoApi from "../../../api/taskManagerApi.ts"
import { extractBackendErrorMessage } from "../../../helpers/manageBackendError.ts"

export interface CalendarEventsState {
  activeCalendarEvent: CalendarEvent | null
  events: CalendarEvent[]
  eventsByTask: CalendarEvent[] // in task form
  loading: boolean
  backendErrorMessage: string | null
}

const initialState: CalendarEventsState = {
  activeCalendarEvent: null,
  events: [],
  eventsByTask: [],
  loading: false,
  backendErrorMessage: null,
}

export const calendarEventSlice = createSlice({
  name: "calendarEvent",
  initialState,
  reducers: {
    onSetActiveEventState: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.activeCalendarEvent = payload
    },
    onSetEventsByTaskState: (state, { payload }: PayloadAction<CalendarEvent[]>) => {
      state.eventsByTask = payload
    },
    onAddNewEventByTaskState: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.eventsByTask.push(payload)
    },
    onUpdateEventByTaskState: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.eventsByTask = state.eventsByTask.map(event =>
        event.id === payload.id ? payload : event
      )
    },
    onDeleteEventByTaskState: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.eventsByTask = state.eventsByTask.filter(event =>
        event.id !== payload.id
      )
    },
    onResetEventsByTaskState: (state) => {
      state.eventsByTask = []
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
  onSetActiveEventState,
  onSetEventsByTaskState,
  onAddNewEventByTaskState,
  onUpdateEventByTaskState,
  onDeleteEventByTaskState,
  onResetEventsByTaskState,

} = calendarEventSlice.actions
