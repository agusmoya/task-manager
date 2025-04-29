import { EventCard } from '../event-card/EventCard.tsx'
import { FabAddEvent } from '../../../calendar/components/add-event-btn/FabAddEvent.tsx'

import { type CalendarEvent } from '../../../types/calendar-event.d'


import './EventCardList.css'


interface Props {
  events: CalendarEvent[]
}

export const EventCardList = ({ events }: Props) => {

  return (
    <section className="event-card-list" aria-label="Eventos asociados a esta tarea">
      <p className="event-card-list__title">Related events:</p>
      <FabAddEvent className='event-card-list__btn' />

      {
        events.length === 0
          ? <p className="event-card-list__empty">There are no events added yet.</p>
          : events.map(event => (
            <EventCard key={event.startDate.getTime()} event={event} />
          ))
      }
    </section>
  )
}
