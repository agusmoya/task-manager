export const CALENDAR_DAY_TYPE = {
  PREVIOUS: 'prev',
  CURRENT: 'current',
  NEXT: 'next',
} as const

interface CalendarDayType {
  name: 'prev' | 'current' | 'next'
}

export interface CalendarDay {
  day: number
  dayName: string
  type: (typeof CALENDAR_DAY_TYPE)[keyof typeof CALENDAR_DAY_TYPE]
  month: number
  year: number
}

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2000, i))
)
