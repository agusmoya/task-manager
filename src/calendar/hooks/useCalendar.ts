import { useMemo } from 'react'

import dayjs from 'dayjs'

import { IEvent } from '../../types/event'
import { CalendarDayWithEvents } from '../../types/calendar-day'

import { computeCalendar } from '../utils/computeCalendar'
import { useEventActions } from '../../store/hooks/useEventActions'
import { useCalendarActions } from '../../store/hooks/useCalendarActions'

/**
 * Custom hook for calendar functionality
 *
 * Provides calendar days with events, active day information, and date labels.
 * Optimized with memoization to prevent unnecessary recalculations.
 *
 * @returns Object containing calendar data and utility functions
 * @returns {string} activeCalendarDayName - Name of the selected day (e.g., "Monday")
 * @returns {Function} resetActiveCalendarDay - Function to reset the active day selection
 * @returns {string} fullDateLabel - Full date in format "DD MMM YYYY"
 * @returns {string} todayDateLabel - Today's date in format "ddd, DD MMMM"
 * @returns {IEvent[]} eventsForActiveDay - Array of events for the selected day
 * @returns {CalendarDayWithEvents[]} calendarDays - Array of calendar days with their events
 */
export const useCalendar = () => {
  const { activeCalendarDay, resetActiveCalendarDay, year, month } = useCalendarActions()
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

  // Events for the currently active day
  const eventsForActiveDay = useMemo<IEvent[]>(() => {
    if (!activeCalendarDay) return []

    const { year, month, day } = activeCalendarDay
    const targetDay = calendarDays.find(
      cd => cd.year === year && cd.month === month && cd.day === day
    )
    return targetDay?.events ?? []
  }, [calendarDays, activeCalendarDay])

  // Labels for calendar tags
  const { todayDateLabel, fullDateLabel, activeCalendarDayName } = useMemo(() => {
    if (!activeCalendarDay) {
      return {
        todayDateLabel: dayjs().format('ddd, DD MMMM'),
        fullDateLabel: '',
        activeCalendarDayName: '',
      }
    }

    const { day, month, year } = activeCalendarDay
    const activeDate = dayjs().year(year).month(month).date(day)

    return {
      todayDateLabel: dayjs().format('ddd, DD MMMM'),
      fullDateLabel: activeDate.format('DD MMM YYYY'),
      activeCalendarDayName: activeDate.format('dddd'),
    }
  }, [activeCalendarDay])

  return {
    activeCalendarDayName,
    resetActiveCalendarDay,
    fullDateLabel,
    todayDateLabel,
    eventsForActiveDay,
    calendarDays,
  }
}
