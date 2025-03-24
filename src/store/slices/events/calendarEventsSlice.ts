import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { addHours } from "date-fns"

import { type CalendarEvent } from "../../../calendar/types/calendar-event.d"
import { TODAY } from "../../../calendar/constants/constants.ts"

export interface CalendarEventsState {
  events: CalendarEvent[]
  activeCalendarEvent: CalendarEvent | null
}

const initialState: CalendarEventsState = {
  events: [
    {
      _id: TODAY.getDate(),
      title: 'Conference',
      start: TODAY,
      end: addHours(TODAY, 2),
      notes: 'Big conference for important people',
      user: {
        _id: 1,
        name: 'Natt'
      }
    }
  ],
  activeCalendarEvent: null
}

export const calendarEventsSlice = createSlice({
  name: "calendarEvents",
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
        event._id === payload._id ? payload : event
      )
    },
    onDeleteEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.filter(event =>
        event._id !== payload._id
      )
    },
    onLoadEvents: (state, { payload }: PayloadAction<CalendarEvent[]>) => {
      state.events = payload
    }
  }
})

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarEventsSlice.actions
