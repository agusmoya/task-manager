import { Dayjs } from 'dayjs'

import './DatePill.css'

type Props = {
  isToday: boolean
  date: Dayjs
  isSelected: boolean
  onSelect: (date: Dayjs) => void
}

export const DatePill = ({ date, isToday, isSelected, onSelect }: Props) => {
  const numberDay = date.date()
  const nameDay = date.format('dddd').slice(0, 3)

  return (
    <button
      type="button"
      className={['pill', isToday && 'pill--today', isSelected && 'pill--selected']
        .filter(Boolean)
        .join(' ')}
      onClick={() => onSelect(date)}
    >
      <h3>{numberDay}</h3>
      <small>{nameDay}</small>
      <div className={`${isToday && 'pill__dot'}`}></div>
    </button>
  )
}
