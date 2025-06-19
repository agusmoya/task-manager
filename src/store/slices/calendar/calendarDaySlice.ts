import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CALENDAR_DAY_TYPE, WEEKDAYS, CalendarDay } from '../../../types/calendar-day.d'
import { IEvent } from '../../../types/event'

import { getToday } from '../../../calendar/utils/dateUtils'
import { computeCalendar } from '../../../calendar/utils/computeCalendar'

const now = getToday()

const calendarDay: CalendarDay = {
  day: now.getDate(),
  month: now.getMonth(),
  year: now.getFullYear(),
  type: CALENDAR_DAY_TYPE.CURRENT,
  dayName: WEEKDAYS[now.getDay()],
}

export interface CalendarDayState {
  today: Date
  weekDays: string[]
  month: number
  year: number
  calendarDays: CalendarDay[]
  activeCalendarDay: CalendarDay
  activeCalendarEvent: IEvent | undefined
}

const initialState: CalendarDayState = {
  today: now,
  weekDays: WEEKDAYS,
  month: now.getMonth(),
  year: now.getFullYear(),
  calendarDays: computeCalendar(now.getMonth(), now.getFullYear()),
  activeCalendarDay: calendarDay,
  activeCalendarEvent: undefined,
}

export const calendarDaySlice = createSlice({
  name: 'calendarDay',
  initialState,
  reducers: {
    onGenerateCalendar: state => {
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onSetMonth: (state, { payload }: PayloadAction<number>) => {
      state.month = payload
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onSetYear: (state, { payload }: PayloadAction<number>) => {
      state.year = payload
    },
    onGetNextMonth: state => {
      if (state.month === 11) {
        state.month = 0
        state.year += 1
      } else {
        state.month += 1
      }
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onGetPreviousMonth: state => {
      if (state.month === 0) {
        state.month = 11
        state.year -= 1
      } else {
        state.month -= 1
      }
      state.calendarDays = computeCalendar(state.month, state.year)
    },
    onSetActiveCalendarDay: (state, { payload }: PayloadAction<CalendarDay>) => {
      state.activeCalendarDay = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  onGenerateCalendar,
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onSetMonth,
  onSetYear,
} = calendarDaySlice.actions
