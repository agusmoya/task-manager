import { useState, useCallback } from 'react'

export function useSlide() {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const slideLeft = useCallback((callback: () => void) => {
    setDirection('left')
    callback()
  }, [])

  const slideRight = useCallback((callback: () => void) => {
    setDirection('right')
    callback()
  }, [])

  const reset = useCallback(() => setDirection(null), [])

  return { direction, slideLeft, slideRight, reset }
}
