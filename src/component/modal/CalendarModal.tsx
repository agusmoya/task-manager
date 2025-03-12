import { useEffect, useRef } from "react";

import { useEventModalActions } from "../../store/hooks/useEventModalActions.ts";

import './CalendarModal.css';

type CalendarModalProps = {
  title: string;
  children: React.ReactNode;
}

export const CalendarModal = ({ title, children }: CalendarModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { isModalOpen, closeModal } = useEventModalActions()

  useEffect(() => {
    const modal = modalRef.current;
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
      id="calendar-modal"
      className="calendar-modal"
      ref={modalRef}
      onKeyDown={handleKeydownCloseModal}
    >
      <div className="modal__content">
        <h1 className="modal__title">{title}</h1>
        {children}
        <button className="modal__button-close" onClick={closeModal}>
          Close <small>(or <i>Esc</i> key)</small>
        </button>
      </div>
    </dialog>
  )
}