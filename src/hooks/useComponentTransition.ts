import { useEffect, useRef, useState } from 'react'

type Phase = 'enter' | 'exit'

export const useComponentTransition = <T>(items: T[], duration = 300) => {
  const [current, setCurrent] = useState(items)
  const [phase, setPhase] = useState<Phase>('enter')
  const previous = useRef(items)

  useEffect(() => {
    const isDifferent = items !== previous.current

    if (isDifferent) {
      setPhase('exit')

      const timeout = setTimeout(() => {
        previous.current = items
        setCurrent(items)
        setPhase('enter')
      }, duration)

      return () => clearTimeout(timeout)
    }
  }, [items, duration])

  return { current, phase }
}
