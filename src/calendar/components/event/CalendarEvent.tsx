import { EventProps } from "react-big-calendar";

import { type CustomEvent } from "../../types/event.ts";

import "./CalendarEvent.css";

export const CalendarEvent = ({ event }: EventProps<CustomEvent>) => {
  const { user, title } = event

  return (
    <span>
      <h4>{title}</h4>
      <p>User: {user?.name}</p>
    </span>
  );
}