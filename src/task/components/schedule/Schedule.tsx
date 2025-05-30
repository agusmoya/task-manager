import { Dayjs } from 'dayjs'

import { PhoneIcon } from '../../../components/icons/Icons'

import './Schedule.css'
import { Button } from '../../../components/button/button'

const userImages = [
  '/images/members/user-2.webp',
  '/images/members/user-7.webp',
  '/images/members/user-4.webp',
]

interface Props {
  today: Dayjs
}
// 1 hora => 5 rem
export const Schedule = ({ today }: Props) => {
  const currentHour = today.hour() // Hora (0-23)
  // const minutes = today.minute(); // Minutos (0-59)

  return (
    <section className="schedule section container">
      <aside className="calendar__schedule">
        <small>{currentHour}:00 AM</small>
        <small>09:00 AM</small>
        <small>10:00 AM</small>
        <small>11:00 AM</small>
        <small>12:00 PM</small>
        <small>13:00 PM</small>
        <small>14:00 PM</small>
      </aside>
      <div className="calendar__task-list">
        <article className="calendar__task">
          <div className="calendar__members">
            <div className="calendar__members__avatars">
              {userImages.map((img, index) => (
                <img
                  src={`${img}`}
                  className="calendar__members__avatar"
                  key={index}
                  alt={`User ${index + 1}`}
                />
              ))}
              <span className="calendar__members__avatars--more">+1</span>
            </div>
            <Button type="submit" className="btn btn--filled calendar__icon-btn">
              <PhoneIcon className="calendar__icon" />
            </Button>
          </div>
          <h3>Title task</h3>
        </article>
      </div>
    </section>
  )
}
