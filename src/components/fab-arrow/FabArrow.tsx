import { type RefObject, useState, useEffect } from 'react'

import { NextIcon, PreviousIcon } from '../icons/Icons.tsx'


import './FabArrow.css'

type ArrowButtonProps = {
  direction: 'left' | 'right'
  scrollContainerRef: RefObject<HTMLUListElement>
  widthItemClass: string
}

export const FabArrow = ({ direction, scrollContainerRef, widthItemClass }: ArrowButtonProps) => {
  const [scrollDisabled, setScrollDisabled] = useState(false)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const updateButtonState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container

      if (direction === 'left') {
        setScrollDisabled(scrollLeft <= 0)
      } else {
        setScrollDisabled(scrollLeft + clientWidth >= scrollWidth - 1)
      }
    }

    // Actualiza en scroll
    container.addEventListener('scroll', updateButtonState)

    // Observa cambios en tamaño
    const resizeObserver = new ResizeObserver(updateButtonState)
    resizeObserver.observe(container)

    // Observa cambios en los hijos (por si cambia el contenido de la lista)
    const mutationObserver = new MutationObserver(updateButtonState)
    mutationObserver.observe(container, { childList: true, subtree: true })

    // Llamada inicial
    updateButtonState()

    return () => {
      container.removeEventListener('scroll', updateButtonState)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }

  }, [direction, scrollContainerRef, widthItemClass])


  const handleScroll = () => {
    if (scrollContainerRef.current && !scrollDisabled) {
      const firstItem = scrollContainerRef.current.querySelector(`.${widthItemClass}`) as HTMLElement
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth + 8 // plus gap between items
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -itemWidth : itemWidth,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <button
      className={`btn btn--fab arrow-button arrow-button--${direction}`}
      onClick={handleScroll}
      disabled={scrollDisabled}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
    >
      <span className="btn__state-layer"></span>
      <span className="btn__content">
        {direction === 'left' ? <PreviousIcon /> : <NextIcon />}
      </span>
    </button>
  )
}
