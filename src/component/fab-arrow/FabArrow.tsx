import { type RefObject, useState, useEffect } from 'react'

import { NextIcon, PreviousIcon } from '../icons/Icons.tsx'


import './FabArrow.css'

type ArrowButtonProps = {
  direction: 'left' | 'right'
  scrollContainerRef: RefObject<HTMLUListElement>
  widthItemClass: string
}

export const ArrowButton = ({ direction, scrollContainerRef, widthItemClass }: ArrowButtonProps) => {
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const updateButtonState = () => {
      if (!scrollContainerRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

      if (direction === 'left') {
        setDisabled(scrollLeft <= 0)
      } else {
        setDisabled(scrollLeft + clientWidth >= scrollWidth)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateButtonState)
      //Llamamos una vez para establecer el estado inicial
      updateButtonState()
    }

    return () => container?.removeEventListener('scroll', updateButtonState)
  }, [direction, scrollContainerRef])


  const handleScroll = () => {
    if (scrollContainerRef.current && !disabled) {
      const firstItem = scrollContainerRef.current.querySelector(`.${widthItemClass}`) as HTMLElement
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth + 8 // gap
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -itemWidth : itemWidth,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <button
      className={`arrow-button arrow-button--${direction}`}
      onClick={handleScroll}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
    >
      {direction === 'left' ? <PreviousIcon /> : <NextIcon />}
    </button>
  )
}
