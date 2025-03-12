import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { addHours } from "date-fns";

import { type CustomEvent } from '../../../calendar/types/event.d';
import { type CalendarDay } from '../../../calendar/types/calendar-day.d';
import { WEEKDAYS } from '../../../calendar/constants/constants';

export interface CalendarState {
  activeCalendarDay: CalendarDay;
  activeCalendarEvent: CustomEvent | null;
  calendarEvents: CustomEvent[];
}

const initialState: CalendarState = {
  activeCalendarDay: {
    dayNumber: new Date().getDate(),
    dayName: WEEKDAYS[new Date().getDay()],
    type: "current",
    events: [],
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  activeCalendarEvent: null,
  calendarEvents: [
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
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveCalendarDay: (state, { payload }: PayloadAction<CalendarDay>) => {
      state.activeCalendarDay = payload
    },
    onSetActiveEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      state.activeCalendarEvent = payload
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      state.calendarEvents.push(payload)
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      state.calendarEvents = state.calendarEvents.map((event) => {
        if (event._id === payload._id) {
          return payload
        }
        return event
      })
      console.log(state.activeCalendarDay);

      if (state.activeCalendarDay) { state.activeCalendarDay.events.push(payload) }
    },
    onDeleteEvent: (state, { payload }: PayloadAction<CustomEvent>) => {
      const { _id } = payload
      if (!state.activeCalendarDay) return
      state.calendarEvents = state.calendarEvents.filter(calendarEvent => calendarEvent._id !== _id)
      state.activeCalendarDay.events = state.activeCalendarDay.events.filter(
        (dayActiveEvent) => dayActiveEvent._id !== _id
      )
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  onSetActiveCalendarDay,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent
} = calendarSlice.actions
