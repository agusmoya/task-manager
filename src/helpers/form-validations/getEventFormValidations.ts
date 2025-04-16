import { addHours } from "date-fns"
import dayjs from "dayjs"

import { type CalendarEvent } from "../../types/calendar-event.d"

import { TODAY } from "../../calendar/constants/constants.ts"
import { FormValidations } from "../../auth/hooks/useForm.ts"


export const eventFormFields: CalendarEvent = {
  title: "",
  startDate: TODAY,
  endDate: addHours(TODAY, 1),
  notes: "",
}
export const eventFormValidations: FormValidations<typeof eventFormFields> = {
  title: [
    [(value) => value.trim().length === 0, "Title is required."],
  ],
  startDate: [
    [(value) => !(value), "Start date is required."],
    [
      (value, formState) => value > formState.endDate,
      "The start date cannot be later than the end date."
    ],
  ],
  endDate: [
    [(value) => !(value), "End date is required."],
    [
      (value, formState) => value < formState.startDate,
      "The end date cannot be earlier than the start date."
    ],
  ],
  notes: [
    [(value) => !(value), "Notes are required."],
  ],
}

/**
 * Implementation with: dayjs.
 * Formatea una fecha al formato 'yyyy-MM-ddTHH:mm', requerido por inputs de tipo datetime-local.
 * @param date - La fecha a formatear.
 * @returns Una cadena con el formato adecuado o una cadena vacía si la fecha no es válida.
 */
export const fromDateToDatetimeLocal = (date: Date | string): string => {
  if (!date) {
    console.warn('Date is null')
    return ''
  }
  const parsed = dayjs(date)
  if (!parsed.isValid()) {
    console.warn('Date has an unknown format')
    return ''
  }

  return parsed.format('YYYY-MM-DDTHH:mm')
}

/**
 * Implementation with: date-fns
 * Formatea una fecha al formato 'yyyy-MM-ddTHH:mm', requerido por inputs de tipo datetime-local.
 * @param date - La fecha a formatear.
 * @returns Una cadena con el formato adecuado o una cadena vacía si la fecha no es válida.
 */
// export const formatDateForDatetimeLocal = (date: Date | string): string => {
//   if (!date) return ''
//   const parsedDate = date instanceof Date ? date : new Date(date)
//   if (isNaN(parsedDate.getTime())) return ''
//   return format(parsedDate, "yyyy-MM-dd'T'HH:mm")
// }


