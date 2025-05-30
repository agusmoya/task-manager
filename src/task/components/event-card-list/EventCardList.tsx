import { EventCard } from '../event-card/EventCard'
import { FabAddEvent } from '../../../calendar/components/add-event-btn/FabAddEvent'

import { type CalendarEvent } from '../../../types/calendar-event.d'

import './EventCardList.css'

interface Props {
  events: CalendarEvent[]
}

export const EventCardList = ({ events }: Props) => {
  return (
    <section className="event-card-list" aria-label="Related events to this task">
      <div className="event-card-list__header">
        <p className="event-card-list__title">Related events:</p>
        <FabAddEvent className="event-card-list__btn" />
      </div>
      <div className="event-card-list__scrollable">
        {events?.length === 0 ? (
          <p className="event-card-list__empty">There are no events added yet.</p>
        ) : (
          events.map((event, idx) => <EventCard key={idx} event={event} />)
        )}
      </div>
    </section>
  )
}
