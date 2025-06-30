import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { CloseIcon } from '../icons/Icons'
import { Button } from '../button/Button'

import './Modal.css'

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      // Abrir el <dialog> sólo si no estaba ya abierto
      if (!dialog.open) dialog.showModal()
      // Opcional: enfocar el primer elemento del modal
      const firstFocusable = dialog.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    } else {
      // Cerrar si estaba abierto
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  const handleKeydownCloseModal = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') onClose()
  }

  // Evitar que clic en el contenido no cierre; clic fuera sí
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Si el clic se produce sobre <dialog> (no dentro de .modal__content), cerramos
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal"
      aria-modal="true"
      role="dialog"
      onKeyDown={handleKeydownCloseModal}
      onClick={handleBackdropClick}
    >
      <div className="modal__content">
        <h1 className="modal__title">{title}</h1>
        <div className="modal__body">{children}</div>
        <Button
          type="button"
          variant="icon"
          className="modal__button-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <CloseIcon aria-hidden="true" focusable="false" />
        </Button>
      </div>
    </dialog>,
    document.body
  )
}
