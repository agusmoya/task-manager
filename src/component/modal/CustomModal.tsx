import { useEffect, useRef, KeyboardEvent } from "react";

import './CustomModal.css';
import { useEventModalStore } from '../../store/hooks/useEventModalStore';

type ModalProps = {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
}

export const CustomModal = ({ title, isOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { closeModal } = useEventModalStore()

  useEffect(() => {
    const modal = modalRef.current;
    if (isOpen) {
      modal?.showModal()
    } else {
      modal?.close()
    }
  }, [isOpen])

  const handleClickCloseModal = () => {
    closeModal()
  }

  const handleKeydownCloseModal = (event: KeyboardEvent<HTMLDialogElement>) => {
    const modal = modalRef.current;
    if (event.key === "Escape") {
      modal?.close()
    }
  }

  return (
    <dialog id="modal" ref={modalRef} className="modal" onKeyDown={handleKeydownCloseModal}>
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