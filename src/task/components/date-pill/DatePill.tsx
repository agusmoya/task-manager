import { Dayjs } from 'dayjs'

import './DatePill.css'

interface Props {
  isToday: boolean
  date: Dayjs
  isSelected: boolean
  hasEvents: boolean
  onSelect: (date: Dayjs) => void
}

export const DatePill = ({ date, isToday, isSelected, hasEvents, onSelect }: Props) => {
  const numberDay = date.date()
  const nameDay = date.format('dddd').slice(0, 3)

  return (
    <>
      <button
        type="button"
        className={[
          'pill',
          isToday && 'pill--today',
          isSelected && 'pill--selected',
          hasEvents && 'pill--has-events',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onSelect(date)}
      >
        <h3>{numberDay}</h3>
        <small>{nameDay}</small>
        <div className="pill__dot"></div>
      </button>
    </>
  )
}
