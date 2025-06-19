import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { eventsApi } from '../../../services/eventsApi'

import { IEvent } from '../../../types/event'

export const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
})

export interface IEventState {
  activeEventId?: string
}

const initialState = eventsAdapter.getInitialState<IEventState>({
  activeEventId: undefined,
})

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setActiveEventId: (state, { payload }: PayloadAction<string>) => {
      state.activeEventId = payload
    },
    resetActiveEventId: state => {
      state.activeEventId = undefined
    },
  },
  extraReducers: builder => {
    const { fetchEventsByUser, createEvent, updateEvent, deleteEvent } = eventsApi.endpoints

    builder
      .addMatcher(fetchEventsByUser.matchFulfilled, (state, { payload }) => {
        eventsAdapter.setAll(state, payload)
      })
      .addMatcher(createEvent.matchFulfilled, (state, { payload }) => {
        eventsAdapter.upsertOne(state, payload)
      })
      .addMatcher(updateEvent.matchFulfilled, (state, { payload }) => {
        eventsAdapter.upsertOne(state, payload)
      })
      .addMatcher(deleteEvent.matchFulfilled, (state, action) => {
        const deletedId = action.meta.arg.originalArgs
        eventsAdapter.removeOne(state, deletedId)
        if (state.activeEventId === deletedId) state.activeEventId = undefined
      })
  },
})

export const { setActiveEventId, resetActiveEventId } = eventSlice.actions
