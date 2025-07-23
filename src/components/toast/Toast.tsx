import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { IToast, TOAST_STATUS } from '../../types/ui/toast'

import { CheckIcon, ErrorIcon } from '../icons/Icons'

import './Toast.css'

interface ToastProps {
  toast: IToast
  removeToast: (id: string) => void
}

const EXIT_ANIMATION_DURATION = 300 // must match CSS

/**
 * Toast renders a single notification, handles its own timeout
 * and exposes appropriate ARIA role for screen readers.
 */
export const Toast = ({ toast, removeToast }: ToastProps) => {
  const { id, message, status, duration = 0 } = toast
  const [isExiting, setIsExiting] = useState(false)
  const exitTimeoutRef = useRef<number>()
  const removeTimeoutRef = useRef<number>()

  useEffect(() => {
    if (status !== TOAST_STATUS.LOADING) {
      // At the end of duration, we start the exit
      exitTimeoutRef.current = setTimeout(() => {
        setIsExiting(true)
      }, duration)

      // After the exit animation, we remove it
      removeTimeoutRef.current = setTimeout(() => {
        removeToast(id)
      }, duration + EXIT_ANIMATION_DURATION)

      // Cleanup if the component unmounts before
      return () => {
        clearTimeout(exitTimeoutRef.current)
        clearTimeout(removeTimeoutRef.current)
      }
    }
  }, [status, duration, id, removeToast])

  return (
    <div
      className={clsx('toast', `toast--${status}`, isExiting && 'toast--exiting')}
      role={status === TOAST_STATUS.ERROR ? 'alert' : 'status'}
      aria-live="off"
    >
      {status === TOAST_STATUS.LOADING && <span className="toast__loader" />}

      {status === TOAST_STATUS.SUCCESS && (
        <span className="toast__icon">
          <CheckIcon />
        </span>
      )}
      {status === TOAST_STATUS.ERROR && (
        <span className="toast__icon">
          <ErrorIcon />
        </span>
      )}

      <span className="toast__message">{message}</span>

      <span className="toast__progress" style={{ animationDuration: `${duration}ms` }} />
    </div>
  )
}
