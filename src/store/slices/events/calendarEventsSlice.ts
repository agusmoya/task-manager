import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { type CalendarEvent } from "../../../types/calendar-event.d"

export interface CalendarEventsState {
  events: CalendarEvent[]
  activeCalendarEvent: CalendarEvent | null
}

const initialState: CalendarEventsState = {
  events: [
    // {
    //   id: TODAY.getTime().toString(),
    //   title: 'Conference',
    //   startDate: TODAY,
    //   endDate: addHours(TODAY, 4),
    //   notes: 'Big conference for important people',
    //   createdBy: undefined
    // }
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
        event.id === payload.id ? payload : event
      )
    },
    onDeleteEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.filter(event =>
        event.id !== payload.id
      )
    },
  }
})

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,

} = calendarEventsSlice.actions
