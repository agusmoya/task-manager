import { useEffect, useRef } from "react"

import { CloseIcon } from '../icons/Icons.tsx'

import { useEventModalActions } from "../../store/hooks/useEventModalActions.ts"

import './Modal.css'

type CalendarModalProps = {
  title: string
  children: React.ReactNode
}

export const CalendarModal = ({ title, children }: CalendarModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { isModalOpen, closeModal } = useEventModalActions()

  useEffect(() => {
    const modal = modalRef.current
    if (isModalOpen) {
      modal?.showModal()
    } else {
      modal?.close()
    }
  }, [isModalOpen])

  const handleKeydownCloseModal = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") closeModal()
  }

  return (
    <dialog
      id="modal"
      className="modal"
      ref={modalRef}
      onKeyDown={handleKeydownCloseModal}
    >
      <div className="modal__content">
        <h1 className="modal__title">{title}</h1>
        {children}
        <button
          aria-label="Close"
          className="btn btn--icon modal__button-close"
          onClick={closeModal}
        >
          <span className="btn__state-layer"></span>
          <span className="btn__content">
            <CloseIcon aria-hidden="true" focusable="false" />
          </span>
        </button>
      </div>
    </dialog>
  )
}
