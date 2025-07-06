import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import './Clock.css'

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState<string>(() => dayjs().format('hh:mm:ss A'))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('hh:mm:ss A'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <time className="clock">{currentTime}</time>
}
