// import { addHours } from "date-fns"

// import { type CalendarDay } from "../types/calendar-day.d"

// export const assignEventsToCurrentMonth = (
//   currentMonthDays: CalendarDay[],
//   today: Date
// ) => {
//   const todayCalendarDay = currentMonthDays.find(
//     (day) => day.dayNumber === today.getDate()
//       && day.month === today.getMonth()
//       && day.year === today.getFullYear()
//   )
//   todayCalendarDay?.events.push(
//     {
//       _id: today.getTime(),
//       title: 'Conference',
//       start: today,
//       end: addHours(today, 2),
//       notes: 'Big conference for important people',
//       user: {
//         _id: 1,
//         name: 'Natt'
//       }
//     }
//   )
// }