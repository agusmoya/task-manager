import clsx from 'clsx'

import './Chip.css'

interface ChipProps {
  label: string
  color?: 'default' | 'success' | 'warning' | 'info' | 'error'
  variant?: 'filled' | 'outlined'
  className?: string
}

export const Chip = ({ label, color = 'default', variant, className }: ChipProps) => {
  return (
    <span className={clsx('chip', `chip--${color}`, `chip--${variant}`, className)}>{label}</span>
  )
}
