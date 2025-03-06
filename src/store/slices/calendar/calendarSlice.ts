import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type CustomEvent } from '../../../calendar/types/event';

import { getEvents } from '../../../calendar/mocks/events.ts';

export interface CalendarState {
  events: CustomEvent[]
  activeEvent: CustomEvent | null;
}

const initialState: CalendarState = {
  events: getEvents(),
  activeEvent: null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload
        }
        return event
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event._id !== state.activeEvent?._id)
        state.activeEvent = null
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions
