import dayjs from 'dayjs'

import { EventSegment } from '../task/components/schedule/type-ui/event-ui'

import { IEvent } from '../types/event'

/**
 * Split events into one or two segments:
 * - single-day events produce one segment with isStartSegment=true
 * - overnight events produce:
 *   • a first-day segment (isStartSegment=true)
 *   • a second-day segment (isStartSegment=false)
 */
export const getEventsSegments = (events: IEvent[] = []): EventSegment[] => {
  const segments: EventSegment[] = []
  events.forEach(evt => {
    const start = dayjs(evt.start)
    const end = dayjs(evt.end)

    // single-day event
    if (end.isSame(start, 'day')) {
      const fullMinutes = end.diff(start, 'minute')
      // convert to hours and round to nearest 0.5
      const fullHoursRaw = fullMinutes / 60
      const fullHours = Math.round(fullHoursRaw * 2) / 2

      segments.push({
        event: evt,
        start,
        end,
        duration: fullHours,
        isStartSegment: false,
        isEndSegment: false,
      })
    } else {
      // first-day segment
      const endOfStartDay = start.endOf('day')

      const firstMinutes = endOfStartDay.diff(start, 'minute')
      const firstHoursRaw = firstMinutes / 60
      const firstHours = Math.round(firstHoursRaw * 2) / 2

      segments.push({
        event: evt,
        start,
        end: endOfStartDay,
        duration: firstHours,
        isStartSegment: true,
        isEndSegment: false,
      })
      // overnight: second-day segment
      const startOfEndDay = end.startOf('day')
      const secondMinutes = end.diff(startOfEndDay, 'minute')
      const secondHoursRaw = secondMinutes / 60
      const secondHours = Math.round(secondHoursRaw * 2) / 2

      segments.push({
        event: evt,
        start: startOfEndDay,
        end,
        duration: secondHours,
        isStartSegment: false,
        isEndSegment: true,
      })
    }
  })
  console.log(segments)

  return segments
}

export const getHoursSchedule = (segments: EventSegment[]): number[] => {
  if (!segments.length) return [8, 9, 10]

  // 2) We extract the start and end time for every event, should any exist
  const minHStart = 24
  const maxHEnd = 0
  const hours = segments.reduce<[number, number]>(
    ([minH, maxH], evt) => {
      const start = dayjs(evt.start).hour()
      const end = dayjs(evt.end).hour()
      return [Math.min(minH, start), Math.max(maxH, end)]
    },
    [minHStart, maxHEnd]
  )

  // 3) We generate an inclusive array: [startHour, startHour+1, …, endHour]
  const [startHour, endHour] = hours
  const hoursSchedule = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
  return hoursSchedule
}
