import { EventProps } from "react-big-calendar";
import { CustomEvent } from "../types/event";

export const CalendarEvent = ({ event }: EventProps<CustomEvent>) => {
  console.log(event);


  const { user, title } = event

  return (
    <span>
      <h4>{title}</h4>
      <p>User: {user?.name}</p>
    </span>
  );
}