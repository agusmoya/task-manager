import { addHours } from "date-fns";

import { PlusIcon } from "../../../component/icons/Icons.tsx";

import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts";
import { useEventModalActions } from "../../../store/hooks/useEventModalActions.ts";

import './FabAddEvent.css'

export const FabAddEvent = () => {
  const { setActiveEvent, activeCalendarDay } = useCalendarActions()
  const { openModal } = useEventModalActions()

  const handleClickNewEvent = () => {
    if (!activeCalendarDay) return
    const { dayNumber, month, year } = activeCalendarDay
    const selecetedDayDate = new Date(year, month, dayNumber)
    const activeEvent = {
      title: '',
      start: selecetedDayDate,
      end: addHours(selecetedDayDate, 2),
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
    <>
      {activeCalendarDay ? (
        <button className="add-event-btn" onClick={handleClickNewEvent}>
          <PlusIcon className="add-event-icon" />
        </button>
      ) : null}
    </>
  )
}