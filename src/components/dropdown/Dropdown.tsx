import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { TASK_STATUS } from '../../types/task.d'

import { useAuthActions } from '../../store/hooks/useAuthActions'
import { useTaskActions } from '../../store/hooks/useTaskActions'

import './Dropdown.css'

interface DropdownProps {
  children: React.ReactNode
  className?: string
  image?: string
  altText?: string
}

/**
 * Dropdown wraps its children in a native <details> element,
 * managing open state and outside clicks, with proper BEM classes.
 */
export const Dropdown = ({
  children,
  className,
  image = '/images/members/user-1.webp',
  altText = 'Avatar photo',
}: DropdownProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { tasks } = useTaskActions()
  const { user } = useAuthActions()

  const pendingTasks = tasks.filter(t => t.status === TASK_STATUS.PENDING).length

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
      className={clsx('dropdown', className)}
      ref={detailsRef}
      onToggle={e => setIsOpen(e.currentTarget.open)}
    >
      <summary
        onKeyDown={handleKeyDown}
        className="dropdown__label"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="dropdown__user-info">
          <h1>Hi {user?.firstName}</h1>
          <small>{pendingTasks === 1 ? '1 pending task' : `${pendingTasks} pending tasks`}</small>
        </div>
        {image && <img className="dropdown__img" src={image} alt={altText} />}
      </summary>
      <div className="dropdown__menu">{children}</div>
    </details>
  )
}
