import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { eventsApi } from '../../../services/eventsApi'

import { RootState } from '../../store'

import { type IEvent } from '../../../types/event'

const eventsAdapter = createEntityAdapter<IEvent>({
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
    builder
      .addMatcher(eventsApi.endpoints.fetchEventsByUser.matchFulfilled, (state, { payload }) => {
        eventsAdapter.setAll(state, payload)
      })
      .addMatcher(eventsApi.endpoints.createEvent.matchFulfilled, (state, { payload }) => {
        eventsAdapter.upsertOne(state, payload)
      })
      .addMatcher(eventsApi.endpoints.updateEvent.matchFulfilled, (state, { payload }) => {
        eventsAdapter.upsertOne(state, payload)
      })
      .addMatcher(eventsApi.endpoints.deleteEvent.matchFulfilled, (state, { payload: { id } }) => {
        eventsAdapter.removeOne(state, id)
        if (state.activeEventId === id) state.activeEventId = undefined
      })
  },
})

export const { setActiveEventId, resetActiveEventId } = eventSlice.actions

export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventIds,
} = eventsAdapter.getSelectors<RootState>(state => state.event)

export const selectEventsByDate = (date: Date) =>
  createSelector(selectAllEvents, events =>
    events.filter(evt => {
      const startDate = new Date(evt.start)
      return (
        startDate.getFullYear() === date.getFullYear() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getDate() === date.getDate()
      )
    })
  )

export const selectEventsByTaskId = (taskId: string) =>
  createSelector(selectAllEvents, events => events.filter(evt => evt.taskId === taskId))
