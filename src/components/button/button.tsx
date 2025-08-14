import React from 'react'

import clsx from 'clsx'

import { VARIANT, VariantType } from '../../types/ui/variant'

import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType
  disabled?: boolean
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  variant = VARIANT.filled,
  type = 'button',
  disabled = false,
  children,
  className,
  ...props
}) => {
  const classNames = clsx('btn', `btn--${variant}`, disabled && 'btn--disabled', className)

  return (
    <button type={type} className={classNames} disabled={disabled} {...props}>
      <span className="btn__content">{children}</span>
    </button>
  )
}
