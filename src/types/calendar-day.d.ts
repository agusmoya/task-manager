export const CALENDAR_DAY_TYPE = {
  PREVIOUS: "prev",
  CURRENT: "current",
  NEXT: "next",
} as const

interface CalendarDayType {
  name: "prev" | "current" | "next"
}


export interface CalendarDay {
  day: number
  dayName: string
  type: (typeof CALENDAR_DAY_TYPE)[keyof typeof CALENDAR_DAY_TYPE]
  month: number
  year: number
}
