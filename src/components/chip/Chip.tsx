import clsx from 'clsx'

import { COLOR_PROGRESS, ColorProgressType } from '../../types/ui/Progress'
import { VARIANT, VariantType } from '../../types/ui/Variant'

import './Chip.css'

interface ChipProps {
  label: string
  role: string
  color?: ColorProgressType
  variant?: VariantType
  className?: string
}

export const Chip = ({
  label,
  role,
  color = COLOR_PROGRESS.default,
  variant = VARIANT.filled,
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
