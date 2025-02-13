import { useState } from 'react';

import { localizer } from '../helpers/calendarLocalizer.ts';
import { Calendar, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CustomModal } from '../../component/modal/CustomModal.tsx';
import { EventCalendarForm } from '../components/form/EventForm.tsx';
import { CalendarEvent } from '../components/event/CalendarEvent.tsx';
import { type CustomEvent, type EventStyleGetter } from '../types/event.ts';
import { useUiStore, useCalendarStore } from '../../store/hooks';
import { FabNewEvent } from '../components/fabNewEvent/FabNewEvent.tsx';
import { FabDeleteEvent } from '../components/fabDeleteEvent/FabDeleteEvent.tsx';


export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const { isModalOpen, openModal, closeModal } = useUiStore()
  const { events, activeEvent, setActiveEvent } = useCalendarStore()

  const eventStyleGetter: EventStyleGetter<CustomEvent> = (
    // event,
    // start,
    // end,
    // isSelected
  ) => {
    return {
      className: 'calendar-event'
    }
  }

  const onDoubleClick = () => {
    openModal()
  }

  const onSelect = (event: CustomEvent) => {
    console.log({ selectClick: event })
    setActiveEvent(event)
  }

  const onViewChanged = (eventView: View) => {
    localStorage.setItem('lastView', eventView)
    setLastView(eventView)
  }

  const handleOnCloseModal = () => {
    closeModal()
  }

  return (
    <>
      <FabNewEvent />
      {activeEvent && <FabDeleteEvent />}
      <Calendar<CustomEvent>
        culture='en'
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        //messages={messages} // Textos en español
        //formats={formats} // Formatos en español
        style={{ height: '100vh' }}
        eventPropGetter={eventStyleGetter}
        events={events}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        defaultView={lastView as View}
      />
      <CustomModal isOpen={isModalOpen} onClose={handleOnCloseModal}>
        <EventCalendarForm />
      </CustomModal>
    </>

  )
}
