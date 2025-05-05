import { PlusIcon } from "../../../components/icons/Icons.tsx"
import { Button } from "../../../components/button/button.tsx"

import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts"
import { useModalActions } from "../../../store/hooks/useModalActions.ts"


import './FabAddEvent.css'


interface Props {
  className?: string
}

export const FabAddEvent = ({ className }: Props) => {
  const { activeCalendarDay } = useCalendarActions()
  const { openModal } = useModalActions()

  const handleClickNewEvent = () => {
    openModal()
  }

  return (
    <>
      {
        activeCalendarDay &&
        <Button
          type="button"
          className={`btn btn--outlined add-event-btn ${className}`}
          onClick={handleClickNewEvent}
        >
          <PlusIcon className="add-event-icon" />
        </Button>
      }
    </>
  )
}