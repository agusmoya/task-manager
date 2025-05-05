import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { CALENDAR_DAY_TYPE, type CalendarDay } from '../../../types/calendar-day.d'
import { type CalendarEvent } from '../../../types/calendar-event.d'

import { WEEKDAYS, TODAY } from '../../../calendar/constants/constants.ts'
import { getPreviousDaysMonth } from '../../../calendar/utils/getPrevDaysMonth.ts'
import { getNextDaysMonth } from '../../../calendar/utils/getNextDaysMonth.ts'
import { getCurrentDaysMonth } from '../../../calendar/utils/getCurrentDaysMonth.ts'

const calendarDay: CalendarDay = {
  day: TODAY.getDate(),
  month: TODAY.getMonth(),
  year: TODAY.getFullYear(),
  type: CALENDAR_DAY_TYPE.CURRENT,
  dayName: 'Monday'
}

export interface CalendarDaysState {
  today: Date
  weekDays: string[]
  month: number
  year: number
  calendarDays: CalendarDay[]
  activeCalendarDay: CalendarDay
  activeCalendarEvent: CalendarEvent | undefined
}

const initialState: CalendarDaysState = {
  today: TODAY,
  weekDays: WEEKDAYS,
  month: TODAY.getMonth(),
  year: TODAY.getFullYear(),
  calendarDays: [],
  activeCalendarDay: calendarDay,
  activeCalendarEvent: undefined,
}

export const calendarDaySlice = createSlice({
  name: 'calendarDay',
  initialState,
  reducers: {
    onGenerateCalendar: (state) => {
      const firstMonthDate = new Date(state.year, state.month, 1)
      const lastMonthDate = new Date(state.year, state.month + 1, 0)
      const startDay = firstMonthDate.getDay()
      const lastMonthDay = lastMonthDate.getDate()

      const prevMonthDays = getPreviousDaysMonth(startDay, state.month, state.year)
      const nextMonthDays = getNextDaysMonth(startDay, lastMonthDay, state.month, state.year)
      const currentMonthDays = getCurrentDaysMonth(lastMonthDay, state.month, state.year)

      state.calendarDays = [
        ...prevMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
      ]
    },
    onSetMonth: (state, { payload }: PayloadAction<number>) => {
      state.month = payload
    },
    onSetYear: (state, { payload }: PayloadAction<number>) => {
      state.year = payload
    },
    onGetNextMonth: (state) => {
      if (state.month === 11) {
        state.month = 0
        state.year += 1
      } else {
        state.month += 1
      }
    },
    onGetPreviousMonth: (state) => {
      if (state.month === 0) {
        state.month = 11
        state.year -= 1
      } else {
        state.month -= 1
      }
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
