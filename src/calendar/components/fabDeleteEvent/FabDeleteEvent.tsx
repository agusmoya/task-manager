import { useCalendarStore } from '../../../store/hooks/useCalendarStore';
import { DeleteIcon } from '../icons/Icons';

import './FabDeleteEvent.css'


export const FabDeleteEvent = () => {
  const { startDeletingEvent } = useCalendarStore()

  const handleClickDeleteEvent = () => {
    startDeletingEvent()
  }

  return (
    <button className="fab-delete-event" onClick={handleClickDeleteEvent}>
      <DeleteIcon />
    </button>
  );
}