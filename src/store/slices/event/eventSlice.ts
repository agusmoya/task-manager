import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { eventsApi } from '../../../services/eventsApi'

import { IEventLocal } from '../../../types/event'

export const eventsAdapter = createEntityAdapter<IEventLocal>({
  sortComparer: (a, b) => a.start.localeCompare(b.start),
})

export interface IEventState extends ReturnType<typeof eventsAdapter.getInitialState> {
  activeEventId?: string
}

const initialState: IEventState = {
  ...eventsAdapter.getInitialState(),
  activeEventId: undefined,
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // This is possible thanks to the adapter extension
    addEvent: eventsAdapter.addOne,
    updateEvent: eventsAdapter.updateOne,
    removeEvent: eventsAdapter.removeOne,
    setAllEvents: eventsAdapter.setAll,
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
