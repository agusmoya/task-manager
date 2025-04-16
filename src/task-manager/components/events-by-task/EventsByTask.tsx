import { ScrollableContainer } from '../scrollable-container/ScrollableContainer.tsx'


import './EventsByTask.css'


export const EventsByTask = () => {
  return (
    <section className="events section" id="events-by-task">
      <div className="events__container container">
        <header className="events__header">
          <h2 className="events__title">Events for task: NAME TASK</h2>
          <a className="events__see-all">See all</a>
        </header>
        <ScrollableContainer
          className="events__list"
          itemClass="events__item"
        >
          <li className="events__item">FIRST ITEM</li>
          <li className="events__item">SECOND ITEM</li>
          <li className="events__item">THIRD ITEM</li>
          <li className="events__item">FOURTH ITEM</li>
          <li className="events__item">FIFTH ITEM</li>
          <li className="events__item">SIXTH ITEM</li>
        </ScrollableContainer>
      </div>
    </section>
  )
}
