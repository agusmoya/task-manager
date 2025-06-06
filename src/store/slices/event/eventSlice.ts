import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type IEvent } from '../../../types/event'

import { fetchEventsByUserIdThunk } from './eventThunks'

export interface EventState {
  activeEvent: IEvent | null
  events: IEvent[]
  loading: boolean
  backendErrorMessage: string | undefined
}

const initialState: EventState = {
  activeEvent: null,
  events: [],
  loading: false,
  backendErrorMessage: undefined,
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    onSetActiveEventState: (state, { payload }: PayloadAction<IEvent>) => {
      state.activeEvent = payload
    },
    onAddEvent: (state, { payload }: PayloadAction<IEvent>) => {
      state.events.push(payload)
    },
    onUpdateEvent: (state, { payload }: PayloadAction<IEvent>) => {
      state.events = state.events.map(evt => (evt.id === payload.id ? payload : evt))
    },
    onDeleteEvent: (state, { payload }: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== payload)
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
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onClearBackendErrorMessage,
} = eventSlice.actions
