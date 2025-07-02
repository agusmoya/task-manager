import { useRef } from 'react'

import { FabArrow } from '../fab-arrow/FabArrow'

import './ScrollableContainer.css'

interface ScrollableContainerProps {
  children: React.ReactNode
  itemClass: string
  className?: string
}

export const ScrollableContainer = ({
  children,
  itemClass,
  className = '',
}: ScrollableContainerProps) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null)

  return (
    <div className="scrollable-container">
      <FabArrow direction="left" scrollContainerRef={scrollContainerRef} itemClass={itemClass} />
      <ul ref={scrollContainerRef} className={`scrollable-container__list ${className}`}>
        {children}
      </ul>
      <FabArrow direction="right" scrollContainerRef={scrollContainerRef} itemClass={itemClass} />
    </div>
  )
}
