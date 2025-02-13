import { CustomEvent } from "../types/event";

import { addHours } from "date-fns";

export function getEvents(): CustomEvent[] {
  return [
    {
      _id: new Date().getTime(),
      title: 'Conference',
      start: new Date(),
      end: addHours(new Date(), 2),
      notes: 'Big conference for important people',
      bgColor: '#fafafa',
      user: {
        _id: 1,
        name: 'Natt'
      }
    },
  ]
}