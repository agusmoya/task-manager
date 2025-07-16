import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)

import { IEvent } from './event'

export const CALENDAR_DAY_TYPE = {
  PREVIOUS: 'prev',
  CURRENT: 'current',
  NEXT: 'next',
} as const

export type TypeCalendarDay = (typeof CALENDAR_DAY_TYPE)[keyof typeof CALENDAR_DAY_TYPE]

export interface CalendarDay {
  day: number
  dayName: string
  type: TypeCalendarDay
  month: number
  year: number
}

export interface CalendarDayWithEvents extends CalendarDay {
  events: IEvent[]
}

export const WEEKDAYS = dayjs.weekdaysShort()

export const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2000, i))
)
