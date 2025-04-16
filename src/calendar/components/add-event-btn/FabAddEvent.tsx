import { addHours } from "date-fns"

import { PlusIcon } from "../../../components/icons/Icons.tsx"

import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts"
import { useEventModalActions } from "../../../store/hooks/useEventModalActions.ts"


import './FabAddEvent.css'

export const FabAddEvent = () => {
  const { setActiveEvent, activeCalendarDay } = useCalendarActions()
  const { openModal } = useEventModalActions()

  const handleClickNewEvent = () => {
    if (!activeCalendarDay) return
    const { day, month, year } = activeCalendarDay
    const selecetedDayDate = new Date(year, month, day)

    const activeCalendarEvent = {
      title: '',
      startDate: selecetedDayDate,
      endDate: addHours(selecetedDayDate, 2),
      notes: '',
      user: {
        _id: 1,
        name: 'Natt'
      }
    }
    setActiveEvent(activeCalendarEvent)
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