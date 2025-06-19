import { Dayjs } from 'dayjs'

import { IEvent } from '../../../../types/event'

export interface EventSegment {
  event: IEvent
  start: Dayjs
  end: Dayjs
  duration: number
  isStartSegment: boolean
  isEndSegment: boolean
}
