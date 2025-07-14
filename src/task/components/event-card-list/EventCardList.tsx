import { EventCard } from '../event-card/EventCard'

import { FabOpenModal } from '../../../components/fab-open-modal/FabOpenModal'

import { IEventLocal } from '../../../types/event'

import './EventCardList.css'

interface Props {
  events: IEventLocal[]
  onOpenNewEventModal: () => void
  onOpenEditEventModal: (evt: IEventLocal) => void
  onDelete: (evtId: string) => void
  eventsValid?: boolean
}

export const EventCardList = ({
  events,
  onOpenNewEventModal,
  onOpenEditEventModal,
  onDelete,
  eventsValid,
}: Props) => {
  return (
    <section className="event-card-list" aria-label="Related events to this task">
      <span className="event-card-list__error" role="alert">
        {!eventsValid ? 'You must add at least one event.' : ''}
      </span>
      <div className="event-card-list__header">
        <p className="event-card-list__title">Related events:</p>
        <FabOpenModal className="event-card-list__btn" handleClickOpen={onOpenNewEventModal} />
      </div>
      <div className="event-card-list__scrollable">
        {events.length === 0 ? (
          <p className="event-card-list__empty">There are no events added yet.</p>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={onOpenEditEventModal}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}
