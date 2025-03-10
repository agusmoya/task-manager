import { addHours } from "date-fns";

import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts";

import { PlusIcon } from "../../icons/Icons";

import './FabAddEvent.css'

interface Props {
  onOpen: () => void
}

export const FabAddEvent = ({ onOpen }: Props) => {
  const { setActiveEvent } = useCalendarActions()

  const handleClickNewEvent = () => {
    const activeEvent = {
      title: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      notes: '',
      user: {
        _id: 1,
        name: 'Natt'
      }
    }
    setActiveEvent(activeEvent)
    onOpen()
    // openModal()
  }

  return (
    <button className="add-event-btn" onClick={handleClickNewEvent}>
      <PlusIcon className="add-event-icon" />
    </button>
  )
}