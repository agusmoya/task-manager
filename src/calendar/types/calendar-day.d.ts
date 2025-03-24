export interface CalendarDay {
  dayNumber: number;
  dayName: string;
  type: "prev" | "current" | "next";
  // events: CalendarEvent[];
  month: number;
  year: number;
}