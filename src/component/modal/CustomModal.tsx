import { useRef, KeyboardEvent, useEffect } from "react";

import './CustomModal.css';

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal = ({ title, isOpen, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    const handleClose = () => {
      onClose() // Cuando se cierra manualmente o con Esc, avisamos al padre
    }

    modal.addEventListener("close", handleClose)
    if (isOpen && !modal.open) modal.showModal()
    if (!isOpen && modal.open) modal.close()

    return () => {
      modal.removeEventListener("close", handleClose)
    }

  }, [isOpen, onClose])

  const handleClickCloseModal = () => {
    modalRef.current?.close()
  }

  const handleKeydownCloseModal = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") modalRef.current?.close()
  }

  return (
    <dialog
      id="modal"
      ref={modalRef}
      className="modal"
      onKeyDown={handleKeydownCloseModal}
    >
      <div className="modal__content">
        <h1 className="modal__title">{title}</h1>
        {children}
        <button className="modal__button-close" onClick={handleClickCloseModal}>
          Close <small>(or <i>Esc</i> key)</small>
        </button>
      </div>
    </dialog>
  )
}