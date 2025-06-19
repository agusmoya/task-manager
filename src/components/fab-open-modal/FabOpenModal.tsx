import { PlusIcon } from '../icons/Icons'
import { Button } from '../button/Button'

import './FabOpenModal.css'

interface Props {
  className?: string
  handleClickOpen: () => void
}

export const FabOpenModal = ({ className, handleClickOpen }: Props) => {
  return (
    <Button
      type="button"
      className={`btn btn--outlined add-event-btn ${className}`}
      onClick={handleClickOpen}
    >
      <PlusIcon className="add-event-icon" />
    </Button>
  )
}
