import { addHours } from "date-fns";

import { useCalendarStore } from "../../../store/hooks/useCalendarStore.ts";
import { useEventModalStore } from "../../../store/hooks/useEventModalStore.ts";

import { PlusIcon } from "../../icons/Icons";

import './FabAddEvent.css'

export const FabAddEvent = () => {
  const { openModal } = useEventModalStore()
  const { setActiveEvent } = useCalendarStore()

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
    openModal()
  }

  return (
    <button className="add-event-btn" onClick={handleClickNewEvent}>
      <PlusIcon className="add-event-icon" />
    </button>
  )
}