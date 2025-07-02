import { Link, LinkProps } from 'react-router-dom'
import clsx from 'clsx'

import '../button/Button.css'

interface ButtonLinkProps extends LinkProps {
  variant?: 'filled' | 'outlined' | 'text' | 'tonal'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export const ButtonLink = ({
  to,
  variant = 'text',
  size = 'medium',
  disabled = false,
  children,
  className,
  ...rest
}: ButtonLinkProps) => {
  const classNames = clsx(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    className
  )

  return (
    <Link to={to} className={classNames} aria-disabled={disabled} {...rest}>
      <span className="btn__content">{children}</span>
    </Link>
  )
}
