import { useRef } from 'react';

import { ArrowButton } from '../../../component/fab-arrow/FabArrow.tsx';

import './ScrollableContainer.css';

type ScrollableContainerProps = {
  children: React.ReactNode
  itemClass: string
  className?: string
}

export const ScrollableContainer = ({ children, itemClass, className = '' }: ScrollableContainerProps) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null)

  return (
    <div className="scrollable-container">
      <ArrowButton direction="left" scrollContainerRef={scrollContainerRef} widthItemClass={itemClass} />
      <ul className={`scrollable-container__list ${className}`} ref={scrollContainerRef}>
        {children}
      </ul>
      <ArrowButton direction="right" scrollContainerRef={scrollContainerRef} widthItemClass={itemClass} />
    </div>
  )
}
