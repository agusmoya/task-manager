import { addHours } from 'date-fns';
import { PencilIcon } from '../icons/Icons';

import { useUiStore } from '../../../store/hooks/useUiStore';
import { useCalendarStore } from '../../../store/hooks/useCalendarStore';

import './FabNewEvent.css'


export const FabNewEvent = () => {

  const { openModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClickNewEvent = () => {
    setActiveEvent({
      title: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      notes: '',
      bgColor: '#fafafa',
      user: {
        _id: 1,
        name: 'Natt'
      }
    })
    openModal()
  }

  return (
    <button className="fab-new-event" onClick={handleClickNewEvent}>
      <PencilIcon />
    </button>
  );
}