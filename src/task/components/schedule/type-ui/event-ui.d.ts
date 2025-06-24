import { Dayjs } from 'dayjs'

export interface EventSegment {
  id: string
  title: string
  notes: string
  start: Dayjs
  end: Dayjs
  duration: number
  isStartSegment: boolean
  isEndSegment: boolean
}
