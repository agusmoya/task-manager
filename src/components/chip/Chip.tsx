import clsx from 'clsx'

import './Chip.css'

interface ChipProps {
  label: string
  color?: 'default' | 'success' | 'warning' | 'info' | 'error'
  className?: string
}

export const Chip = ({ label, color = 'default', className }: ChipProps) => {
  return <span className={clsx('chip', `chip--${color}`, className)}>{label}</span>
}
