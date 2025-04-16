import dayjs, { Dayjs } from 'dayjs';

import { WeekDay } from '../../types/task';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  currentWeek: WeekDay[]
  today: Dayjs
}

export const useCurrentWeek = (): Props => {
  const [today, setToday] = useState<Dayjs>(dayjs())

  // ⏰ Update 'today' to change the day (+ 1000 ms)
  useEffect(() => {
    const now = dayjs();
    const msUntilNextDay = now.endOf("day").diff(now) + 1000;

    const timeout = setTimeout(() => {
      setToday(dayjs()); // Se actualiza justo al cambiar de día
    }, msUntilNextDay);

    // 🧹 Limpieza
    return () => clearTimeout(timeout);
  }, [today]);

  // 📅 Generate days of the current week
  const currentWeek = useMemo(() => {
    // By default, starts in sunday, but +1, starts in monday
    const startOfWeek = today.startOf('week').add(1, 'day')

    return Array.from({ length: 7 },
      (_, i) => {
        const currentDay = startOfWeek.add(i, 'day')
        return {
          date: currentDay.format('dddd, DD/MM/YYYY'),
          isToday: today.isSame(currentDay, 'day'),
          today: today
        }
      })
  }, [today])

  // 📤 Devuelve la semana actual
  return { currentWeek, today }
}
