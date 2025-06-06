import { EventCard } from '../event-card/EventCard'

import { FabOpenModal } from '../../../components/fab-open-modal/FabOpenModal'

import type { IEventLocal } from '../../../types/event'

import './EventCardList.css'

interface Props {
  events: IEventLocal[]
  onOpenModal: () => void
  onEdit: (evt: IEventLocal) => void
  onDelete: (evtId: string) => void
}

export const EventCardList = ({ events, onOpenModal, onEdit, onDelete }: Props) => {
  return (
    <section className="event-card-list" aria-label="Related events to this task">
      <div className="event-card-list__header">
        <p className="event-card-list__title">Related events:</p>
        <FabOpenModal className="event-card-list__btn" handleClickOpen={onOpenModal} />
      </div>
      <div className="event-card-list__scrollable">
        {events?.length === 0 ? (
          <p className="event-card-list__empty">There are no events added yet.</p>
        ) : (
          events.map(event => (
            <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </section>
  )
}
