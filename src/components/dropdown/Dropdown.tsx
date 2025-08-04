import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import './Dropdown.css'

interface DropdownProps {
  children: React.ReactNode
  className?: string
  trigger: React.ReactNode
}

/**
 * Generic dropdown component using native HTML details element
 * @param children - Menu items to render inside dropdown
 * @param className - Additional CSS classes for styling
 * @param trigger - Element that triggers the dropdown (button, image, icon, etc.)
 * @returns @returns JSX.Element - Accessible dropdown component
 */
export const Dropdown = ({ children, className, trigger }: DropdownProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Handle keyboard navigation for dropdown
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (e.key === 'Escape') {
      detailsRef.current?.removeAttribute('open')
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(e.target as Node)) {
        detailsRef.current.removeAttribute('open')
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <details
      name="dropdown"
      className={clsx('dropdown', className)}
      ref={detailsRef}
      onToggle={e => setIsOpen(e.currentTarget.open)}
    >
      <summary
        className="dropdown__summary"
        onKeyDown={handleKeyDown}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </summary>
      <div className="dropdown__menu-wrapper">{children}</div>
    </details>
  )
}
