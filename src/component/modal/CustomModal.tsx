import { useEffect, useRef } from "react";

import './CustomModal.css';

type ModalProps = {
  data?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal = ({ data = 'Info de modal', isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  // open/close
  useEffect(() => {
    const modal = modalRef.current;
    if (isOpen) {
      modal?.showModal()
    } else {
      modal?.close()
    }
  }, [isOpen])
  // close with Esc key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const modal = document.getElementById("modal")
    modal?.addEventListener("keydown", handleKeyDown);
    return () => {
      modal?.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose])

  return (
    <dialog id="modal" ref={modalRef} className="modal">
      <div className="modal__content">
        <h1 className="modal__title">Modal data: {data}</h1>
        {children}
        <button className="modal__button-close" onClick={onClose}>
          Close <small>(or <i>Esc</i> key)</small>
        </button>
      </div>
    </dialog>
  )
}