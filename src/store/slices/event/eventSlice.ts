import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type CalendarEvent } from '../../../types/calendar-event.d'

import { fetchEventsByUserIdThunk } from './eventThunks.ts'

export interface CalendarEventsState {
  activeCalendarEvent: CalendarEvent | null
  events: CalendarEvent[]
  eventsByTask: CalendarEvent[] // in task form
  loading: boolean
  backendErrorMessage: string | undefined
}

const initialState: CalendarEventsState = {
  activeCalendarEvent: null,
  events: [],
  eventsByTask: [],
  loading: false,
  backendErrorMessage: undefined,
}

export const calendarEventSlice = createSlice({
  name: 'calendarEvent',
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
      state.eventsByTask = state.eventsByTask.filter(event => event.id !== payload.id)
    },
    onResetEventsByTaskState: state => {
      state.eventsByTask = []
    },
    onClearBackendErrorMessage: state => {
      state.backendErrorMessage = undefined
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEventsByUserIdThunk.pending, state => {
        state.loading = true
        state.backendErrorMessage = undefined
      })
      .addCase(fetchEventsByUserIdThunk.fulfilled, (state, { payload }) => {
        state.events = payload
        state.loading = false
      })
      .addCase(fetchEventsByUserIdThunk.rejected, (state, { payload }) => {
        state.loading = false
        state.backendErrorMessage = payload
      })
  },
})

export const {
  onSetActiveEventState,
  onSetEventsByTaskState,
  onAddNewEventByTaskState,
  onUpdateEventByTaskState,
  onDeleteEventByTaskState,
  onResetEventsByTaskState,
  onClearBackendErrorMessage,
} = calendarEventSlice.actions
