import { useRef } from 'react'

import { FabArrow } from '../../../components/fab-arrow/FabArrow.tsx'

import './ScrollableContainer.css'

type ScrollableContainerProps = {
  children: React.ReactNode
  itemClass: string
  className?: string
}

export const ScrollableContainer = ({ children, itemClass, className = '' }: ScrollableContainerProps) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null)

  return (
    <div className="scrollable-container">
      <FabArrow direction="left" scrollContainerRef={scrollContainerRef} widthItemClass={itemClass} />
      <ul className={`scrollable-container__list ${className}`} ref={scrollContainerRef}>
        {children}
      </ul>
      <FabArrow direction="right" scrollContainerRef={scrollContainerRef} widthItemClass={itemClass} />
    </div>
  )
}
