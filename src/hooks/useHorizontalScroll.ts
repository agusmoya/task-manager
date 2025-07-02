import { RefObject, useState, useEffect, useCallback } from 'react'

export function useHorizontalScroll(scrollRef: RefObject<HTMLElement>, itemClass: string) {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 0)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [scrollRef])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState)
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    const mo = new MutationObserver(updateScrollState)
    mo.observe(el, { childList: true, subtree: true })
    updateScrollState()
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
      mo.disconnect()
    }
  }, [scrollRef, updateScrollState])

  const scrollByItem = useCallback(
    (direction: 'left' | 'right') => {
      const el = scrollRef.current
      if (!el) return
      const first = el.querySelector(`.${itemClass}`) as HTMLElement
      if (!first) return
      const gap = parseInt(getComputedStyle(el).gap, 10) || 0
      const step = first.offsetWidth + gap
      el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
    },
    [scrollRef, itemClass]
  )

  return { canScrollPrev, canScrollNext, scrollByItem }
}
