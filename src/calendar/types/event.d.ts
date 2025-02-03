interface User {
  _id: number;
  name: string;
}

export interface CustomEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  desc?: string;
  user: User;
  bgColor: string;
}

export type EventStyleGetter<TEvent> = (
  event: TEvent,
  start: Date,
  end: Date,
  isSelected: boolean
) => React.HTMLAttributes<HTMLDivElement>;