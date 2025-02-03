import dayjs from "dayjs";
import { CustomEvent } from "../types/event";

export function getEvents(): CustomEvent[] {
  return [
    {
      id: 5,
      title: 'Conference',
      start: dayjs("2025-02-03 11:00").toDate(),
      end: dayjs("2025-02-03 10:00").toDate(),
      desc: 'Big conference for important people',
      bgColor: '#fafafa',
      user: {
        _id: 1,
        name: 'Natt'
      }
    },
    // {
    //   id: 6,
    //   title: 'Meeting',
    //   start: dayjs("2025-02-07").toDate(),
    //   end: dayjs("2025-02-08").toDate(),
    //   desc: 'Meeting with placeholders',
    //   bgColor: '#fafafa',
    //   user: {
    //     _id: 1,
    //     name: 'Natt'
    //   }
    // },
    // {
    //   id: 7,
    //   title: 'Lunch',
    //   start: dayjs("2025-02-10").toDate(),
    //   end: dayjs("2025-02-12").toDate(),
    //   desc: 'Power lunch',
    //   bgColor: '#fafafa',
    //   user: {
    //     _id: 1,
    //     name: 'Natt'
    //   }
    // },
  ]
}