import { Link, LinkProps } from 'react-router-dom'

import clsx from 'clsx'

import { VARIANT, VariantType } from '../../types/ui/variant'

import '../button/Button.css'

interface ButtonLinkProps extends LinkProps {
  variant?: VariantType
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export const ButtonLink = ({
  to,
  variant = VARIANT.text,
  disabled = false,
  children,
  className,
  ...rest
}: ButtonLinkProps) => {
  const classNames = clsx('btn', `btn--${variant}`, disabled && 'btn--disabled', className)

  return (
    <Link to={to} className={classNames} aria-disabled={disabled} {...rest}>
      <span className="btn__content">{children}</span>
    </Link>
  )
}
