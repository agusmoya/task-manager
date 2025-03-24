interface User {
  _id: number;
  name: string;
}

export interface CalendarEvent {
  _id?: number;
  title: string;
  start: Date;
  end: Date;
  notes?: string;
  user?: User;
}

export type EventStyleGetter<TEvent> = (
  event: TEvent,
  start: Date,
  end: Date,
  isSelected: boolean
) => React.HTMLAttributes<HTMLDivElement>;

interface EventForm {
  title: string;
  start: Date;
  end: Date;
  notes?: string;
}