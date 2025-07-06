import dayjs, { Dayjs } from 'dayjs'

import { IEventForm } from '../../types/event.d'

import { FormValidations } from '../../hooks/useForm'

const MAX_EVENT_HOURS = 8

/**
 * TODO ELIMINAR
 * Implementation with: dayjs.
 * Formatea una fecha al formato 'yyyy-MM-ddTHH:mm', requerido por inputs de tipo datetime-local.
 * @param date - La fecha a formatear.
 * @returns Una cadena con el formato adecuado o una cadena vacía si la fecha no es válida.
 */
export const formatToDatetimeLocal = (date: Date | string): string => {
  if (!date) return ''

  const parsed = dayjs(date)
  if (!parsed.isValid()) return ''

  return parsed.format('YYYY-MM-DDTHH:mm')
}

export const eventFormFields: IEventForm = {
  title: '',
  start: ceilToQuarter(dayjs()).format('YYYY-MM-DDTHH:mm'),
  end: ceilToQuarter(dayjs().add(1, 'hour')).format('YYYY-MM-DDTHH:mm'),
  notes: '',
}

export const eventFormValidations: FormValidations<typeof eventFormFields> = {
  title: [[value => !value, 'Title is required.']],
  start: [
    [value => !value, 'Start date is required.'],
    [
      value => dayjs(value, 'YYYY-MM-DDTHH:mm').minute() % 15 !== 0,
      'Start time must be in 15-minute increments.',
    ],
    [
      (value, formState) => {
        const start = dayjs(value, 'YYYY-MM-DDTHH:mm')
        const end = dayjs(formState.end, 'YYYY-MM-DDTHH:mm')
        return start.isAfter(end)
      },
      'The start date cannot be later than the end date.',
    ],
  ],
  end: [
    [value => !value, 'End date is required.'],
    [
      value => dayjs(value, 'YYYY-MM-DDTHH:mm').minute() % 15 !== 0,
      'End time must be in 15-minute increments.',
    ],
    [
      (value, formState) => {
        const start = dayjs(formState.start, 'YYYY-MM-DDTHH:mm')
        const end = dayjs(value, 'YYYY-MM-DDTHH:mm')
        return end.isBefore(start)
      },
      'The end date cannot be earlier than the start date.',
    ],
    [
      (value, formState) => {
        const start = dayjs(formState.start, 'YYYY-MM-DDTHH:mm')
        const end = dayjs(value, 'YYYY-MM-DDTHH:mm')
        return end.diff(start, 'hours', true) > MAX_EVENT_HOURS
      },
      'The event cannot last longer than 8 hours.',
    ],
  ],
  notes: [[value => value.trim().length === 0, 'Notes are required.']],
}

/**
 * Round up to the next quarter of an hour
 *  @returns Dayjs
 */
function ceilToQuarter(now: Dayjs): Dayjs {
  const m = now.minute()
  const rem = m % 15
  const toAdd = rem === 0 ? 0 : 15 - rem
  return now.add(toAdd, 'minute').second(0).millisecond(0)
}

function getLastEndDate(events: IEventForm[]) {
  const initialValue = events[0].end
  const lastEnd = events.reduce(
    (latest, event) => {
      const eventEnd = dayjs(event.end, 'YYYY-MM-DDTHH:mm')
      return eventEnd.isAfter(latest) ? eventEnd : latest
    },
    dayjs(initialValue, 'YYYY-MM-DDTHH:mm')
  )
  return lastEnd
}

/**
 * Return the next rounded date-time of event, based on last event's end date-time.
 * @param events - Form events.
 * @returns Today's date-time string (YYYY-MM-DDTHH:mm) if events is an empty array, or the next rounded date-time otherwise.
 */
export const getNextStartDate = (events: IEventForm[] = []): string => {
  const now = dayjs()
  const eventExists = events.length > 0

  if (eventExists) {
    const roundedLastEnd = ceilToQuarter(getLastEndDate(events))
    return roundedLastEnd.format('YYYY-MM-DDTHH:mm')
  }

  const nextRounded = ceilToQuarter(now).format('YYYY-MM-DDTHH:mm')
  return nextRounded
}
