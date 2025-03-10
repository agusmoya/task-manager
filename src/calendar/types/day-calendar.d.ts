import { type CustomEvent } from "./event.d";


export interface CalendarDay {
  dayNumber: number;
  dayName: string;
  type: "prev" | "current" | "next";
  events: CustomEvent[];
  month: number;
  year: number;
}