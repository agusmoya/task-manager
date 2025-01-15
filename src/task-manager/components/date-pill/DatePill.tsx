import './DatePill.css'

type Props = {
  isToday: boolean;
  date: string;
}

export const DatePill = ({ date, isToday }: Props) => {
  const [dayTxt, dateTxt] = date.split(',')
  const day = dateTxt.split('/')[0]

  return (
    <div className={`pill ${isToday ? 'pill--is-today' : ''}`}>
      <h3>{day}</h3>
      <small>{dayTxt.slice(0, 3)}</small>
      <div className={`${isToday ? 'pill__dot' : ''}`}></div>
    </div>
  );
}
