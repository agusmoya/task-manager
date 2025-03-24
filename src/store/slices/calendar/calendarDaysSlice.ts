import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type CalendarEvent } from '../../../calendar/types/calendar-event';
import { type CalendarDay } from '../../../calendar/types/calendar-day';

import { WEEKDAYS, TODAY } from '../../../calendar/constants/constants.ts';
import { getPreviousDaysMonth } from '../../../calendar/utils/getPrevDaysMonth.ts';
import { getNextDaysMonth } from '../../../calendar/utils/getNextDaysMonth.ts';
import { getCurrentDaysMonth } from '../../../calendar/utils/getCurrentDaysMonth.ts';

export interface CalendarDaysState {
  today: Date;
  weekDays: string[];
  month: number;
  year: number,
  calendarDays: CalendarDay[];
  activeCalendarDay: CalendarDay | null;
  activeCalendarEvent: CalendarEvent | null;
}

const initialState: CalendarDaysState = {
  today: TODAY,
  weekDays: WEEKDAYS,
  month: TODAY.getMonth(),
  year: TODAY.getFullYear(),
  calendarDays: [],
  activeCalendarDay: null,
  activeCalendarEvent: null,
}

export const calendarDaysSlice = createSlice({
  name: 'calendar',
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
} = calendarDaysSlice.actions
