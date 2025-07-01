import { useEffect, useRef, useState } from 'react'

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

export const Dropdown = ({
  children,
  className,
  image = '/images/members/user-1.webp',
  altText = 'Avatar photo',
}: DropdownProps) => {
  const { tasks } = useTaskActions()
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuthActions()

  const pendingTasks = tasks.filter(t => t.status === TASK_STATUS.PENDING).length

  const closeDropdown = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false
      setIsOpen(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key === 'Escape') {
      closeDropdown()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <details className={`dropdown ${className || ''}`} ref={detailsRef} open={isOpen}>
      <summary
        onKeyDown={handleKeyDown}
        className="dropdown__label"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="nav__user-info">
          <h1>Hi {user?.firstName}</h1>
          <small>{pendingTasks === 1 ? '1 pending task' : `${pendingTasks} pending tasks`}</small>
        </div>
        {image && <img className="dropdown__img" src={image} alt={altText} />}
      </summary>
      <div className="dropdown__menu">{children}</div>
    </details>
  )
}
