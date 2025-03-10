import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type CustomEvent } from '../../../calendar/types/event.d';

import { addHours } from "date-fns";

export interface CalendarState {
  events: CustomEvent[]
  activeEvent: CustomEvent | null;
}

const initialState: CalendarState = {
  events: [
    {
      _id: new Date().getTime(),
      title: 'Conference',
      start: new Date(),
      end: addHours(new Date(), 2),
      notes: 'Big conference for important people',
      user: {
        _id: 1,
        name: 'Natt'
      }
    },
  ],
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
    onDeleteEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      const { _id } = payload
      state.events = state.events.filter((event) => event._id !== _id)
    }
  },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions
