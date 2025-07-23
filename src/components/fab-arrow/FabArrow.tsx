import { RefObject } from 'react'

import { ArrowRightIcon, ArrowLeftIcon } from '../icons/Icons'
import { Button } from '../button/Button'

import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'

import './FabArrow.css'

interface ArrowButtonProps {
  direction: 'left' | 'right'
  scrollContainerRef: RefObject<HTMLUListElement>
  itemClass: string
}

export const FabArrow = ({ direction, scrollContainerRef, itemClass }: ArrowButtonProps) => {
  const { canScrollPrev, canScrollNext, scrollByItem } = useHorizontalScroll(
    scrollContainerRef,
    itemClass
  )

  const handleClick = () => {
    scrollByItem(direction)
  }

  const scrollDisabled = direction === 'left' ? !canScrollPrev : !canScrollNext

  // Only render the button when scrolling is possible
  if (scrollDisabled) return null

  return (
    <div className={`arrow-button-wrapper arrow-button-wrapper--${direction}`}>
      <Button
        variant="icon"
        className={`arrow-button arrow-button--${direction}`}
        onClick={handleClick}
        disabled={scrollDisabled}
        aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      >
        {direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </Button>
    </div>
  )
}
