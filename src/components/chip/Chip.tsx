import clsx from 'clsx'

import './Chip.css'

interface ChipProps {
  label: string
  role: string
  color?: 'default' | 'completed' | 'progress' | 'pending' | 'info' | 'error'
  variant?: 'filled' | 'outlined'
  className?: string
}

export const Chip = ({
  label,
  role,
  color = 'default',
  variant = 'filled',
  className,
}: ChipProps) => {
  return (
    <span
      role={role}
      className={clsx('chip', `chip--${color}`, `chip--${variant}`, className)}
      aria-readonly="true"
    >
      {label}
    </span>
  )
}
