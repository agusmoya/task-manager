import React from 'react'
import './Button.css'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'fab' | 'icon'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  type = 'button',
  disabled = false,
  children,
  className,
  ...props
}) => {
  const classNames = clsx(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    className
  )

  return (
    <button type={type} className={classNames} disabled={disabled} {...props}>
      <span className="btn__state-layer"></span>
      <span className="btn__content">{children}</span>
    </button>
  )
}
