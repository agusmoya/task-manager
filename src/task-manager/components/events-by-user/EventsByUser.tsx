import { useEffect } from 'react'

import { ScrollableContainer } from '../scrollable-container/ScrollableContainer.tsx'

import { useCalendarActions } from '../../../store/hooks/useCalendarActions.ts'


import './EventsByUser.css'


export const EventsByUser = () => {
  const { events, fetchEventsByUserId } = useCalendarActions()

  console.log(events)


  useEffect(() => {
    fetchEventsByUserId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const areEventsPresent = events.length

  return (
    <section className="events section" id="events-by-task">
      <div className="events__container container">
        <header className="events__header">
          <h2 className="events__title">Ongoing Events:</h2>
          <a className="events__see-all">See all</a>
        </header>
        <ScrollableContainer
          itemClass="events__item"
          className={[
            'events__list',
            !areEventsPresent && 'events__list--no-result'
          ].filter(Boolean).join(' ')}
        >
          {
            events.length > 0
              ? events.map(({ id, title, taskId }) => {
                const { _id, title: taskTitle } = taskId
                return (
                  <li key={id} className="events__item">
                    <h3>{title}</h3>
                    <h4>Task:{taskTitle}</h4>
                    <h5>Task Id: {_id}</h5>
                  </li>
                )
              })
              : <span>No events found. Create a new task an organize its events...</span>
          }
        </ScrollableContainer>
      </div>
    </section>
  )
}
