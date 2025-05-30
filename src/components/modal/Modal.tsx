import { useEffect, useRef } from 'react'

import { CloseIcon } from '../icons/Icons'
import { Button } from '../button/button'

import { useModalActions } from '../../store/hooks/useModalActions'

import './Modal.css'

type ModalProps = {
  title: string
  children: React.ReactNode
}

export const Modal = ({ title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { isModalOpen, closeModal } = useModalActions()

  useEffect(() => {
    const modal = modalRef.current
    if (isModalOpen) {
      modal?.showModal()
    } else {
      modal?.close()
    }
  }, [isModalOpen])

  const handleKeydownCloseModal = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') closeModal()
  }

  return (
    <dialog id="modal" className="modal" ref={modalRef} onKeyDown={handleKeydownCloseModal}>
      <div className="modal__content">
        <h1 className="modal__title">{title}</h1>
        {children}
        <Button
          type="button"
          aria-label="Close"
          className="btn btn--icon modal__button-close"
          onClick={() => closeModal()}
        >
          <CloseIcon aria-hidden="true" focusable="false" />
        </Button>
      </div>
    </dialog>
  )
}
