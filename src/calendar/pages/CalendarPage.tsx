import { Calendar } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { localizer } from '../helpers/calendarLocalizer.ts';

import { getEvents } from '../mocks/events.ts';
import { CustomEvent, EventStyleGetter } from '../types/event.ts';
// import dayjs from 'dayjs';
import { CalendarEvent } from '../components/CalendarEvent.tsx';


export const CalendarPage = () => {

  const eventStyleGetter: EventStyleGetter<CustomEvent> = (
    // event,
    // start,
    // end,
    isSelected
  ) => {
    // console.log(event.title, dayjs(start).format('DD/MM/YYYY'), dayjs(end).format('DD/MM/YYYY'), isSelected);

    return {
      // className,
      style: {
        backgroundColor: isSelected ? "#ff6347" : "#3174ad",
        color: "white",
        borderRadius: "5px",
        padding: "5px",
      },
    };
  };

  return (
    <Calendar<CustomEvent>
      culture='en'
      localizer={localizer}
      events={getEvents()}
      startAccessor="start"
      endAccessor="end"
      views={['month', 'week', 'day', 'agenda']}
      //messages={messages} // Textos en español
      //formats={formats} // Formatos en español
      style={{ height: '100vh' }}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
    />
  )
}
