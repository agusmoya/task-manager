import { addHours } from "date-fns";

import { PlusIcon } from "../../icons/Icons";

import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts";
import { useEventModalActions } from "../../../store/hooks/useEventModalActions.ts";
import { useCalendar } from "../../hooks/useCalendar.ts";

import './FabAddEvent.css'

export const FabAddEvent = () => {
  const { today } = useCalendar()
  const { setActiveEvent } = useCalendarActions()
  const { openModal } = useEventModalActions()

  const handleClickNewEvent = () => {
    const activeEvent = {
      title: '',
      start: today,
      end: addHours(today, 2),
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