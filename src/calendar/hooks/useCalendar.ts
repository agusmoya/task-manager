import { useMemo } from 'react'

import dayjs from 'dayjs'

import { IEvent } from '../../types/event'
import { CalendarDayWithEvents } from '../../types/calendar-day'

import { computeCalendar } from '../utils/computeCalendar'
import { useEventActions } from '../../store/hooks/useEventActions'
import { useCalendarActions } from '../../store/hooks/useCalendarActions'

export const useCalendar = () => {
  const { activeCalendarDay, year, month } = useCalendarActions()
  const { events } = useEventActions()

  // Generate the basic 42 CalendarDay grid
  const baseDays = useMemo(() => computeCalendar(month, year), [month, year])

  // Group events by key YYYY-MM-DD
  const eventsByDay = useMemo(() => {
    const map: Record<string, IEvent[]> = {}
    events.forEach(evt => {
      const key = dayjs(evt.start).format('YYYY-MM-DD')
      map[key] = map[key] ? [...map[key], evt] : [evt]
    })
    return map
  }, [events])

  // Enrich every day with its array of events
  const calendarDays = useMemo<CalendarDayWithEvents[]>(() => {
    return baseDays.map(cd => {
      const formattedDate = dayjs().year(cd.year).month(cd.month).date(cd.day)
      const key = formattedDate.format('YYYY-MM-DD')

      return {
        ...cd,
        events: eventsByDay[key] || [],
      }
    })
  }, [baseDays, eventsByDay])

  const eventsForSelectedDay =
    calendarDays.find(cd => {
      const { year, month, day } = activeCalendarDay
      return cd.year === year && cd.month === month && cd.day === day
    })?.events ?? []

  // Labels for calendar tags
  const todayDateLabel = dayjs().format('dddd, DD MMMM')
  const monthYearLabel = dayjs().year(year).month(month).format('MMMM YYYY')
  const activeCalendarDayDate = dayjs()
    .year(year)
    .month(month)
    .date(activeCalendarDay.day)
    .format('DD MMMM YYYY')
  const activeCalendarDayName = activeCalendarDay.dayName

  return {
    activeCalendarDayName,
    activeCalendarDayDate,
    eventsForSelectedDay,
    calendarDays,
    todayDateLabel,
    monthYearLabel,
  }
}
