import { RefObject, useLayoutEffect, useState } from 'react'

/**
 * Measure the height (in rem) of one "row" in a timescale,
 * combining the <small> element height + rowGap from its container.
 */
export function useRowHeight(timescaleRef: RefObject<HTMLElement>) {
  const [rowHeight, setRowHeight] = useState(0)
  const [labelHeight, setLabelHeight] = useState(0)

  useLayoutEffect(() => {
    const el = timescaleRef.current
    if (!el) return

    const smallEl = el.querySelector('small')
    if (!smallEl) return

    const smallHeight = smallEl.getBoundingClientRect().height
    const styles = getComputedStyle(el)

    const gap = parseFloat(styles.rowGap || styles.gap || '0')

    setRowHeight(smallHeight + gap)
    setLabelHeight(smallHeight)
  }, [timescaleRef])

  return { rowHeight, labelHeight }
}
