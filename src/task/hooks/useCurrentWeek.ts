import { useEffect, useMemo, useState } from 'react'

import dayjs, { Dayjs } from 'dayjs'

import { WeekDay } from '../../types/week-day'

interface Props {
  currentWeek: WeekDay[]
  today: Dayjs
}

export const useCurrentWeek = (): Props => {
  const [today, setToday] = useState<Dayjs>(dayjs())

  // Update 'today' to change the day (+ 1000 ms)
  useEffect(() => {
    const now = dayjs()
    const msUntilNextDay = now.endOf('day').diff(now) + 1000

    const timeout = setTimeout(() => {
      setToday(dayjs())
    }, msUntilNextDay)

    return () => clearTimeout(timeout)
  }, [today])

  // Generate days of the current week
  const currentWeek = useMemo(() => {
    // By default, starts in sunday
    const startOfWeek = today.startOf('week')

    return Array.from({ length: 7 }, (_, i) => {
      const currentDay = startOfWeek.add(i, 'day')
      return {
        date: currentDay,
        isToday: today.isSame(currentDay, 'day'),
        today: today,
      }
    })
  }, [today])

  return { currentWeek, today }
}
