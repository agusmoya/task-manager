import React from 'react'
import clsx from 'clsx'

import './SlideTransition.css'

interface SlideTransitionProps {
  direction: 'left' | 'right' | 'center' | null
  /** Clear direction when animation ends */
  onAnimationEnd?: () => void
  children: React.ReactNode
}

/**
 * SlideTransition wraps its children in a viewport that
 * clips overflow, and applies slide-in animations based on direction.
 */
export const SlideTransition: React.FC<SlideTransitionProps> = ({
  direction,
  onAnimationEnd,
  children,
}) => {
  return (
    <div className="slide-viewport" onAnimationEnd={onAnimationEnd}>
      <section className={clsx('slide', direction && `slide-${direction}`)}>{children}</section>
    </div>
  )
}
