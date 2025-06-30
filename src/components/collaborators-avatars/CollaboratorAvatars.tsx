import { IUser } from '../../types/user'

import './CollaboratorAvatars.css'

interface Props {
  users: IUser[]
  className?: string
}

export const CollaboratorAvatars = ({ users, className = '' }: Props) => {
  return (
    <div className={`schedule__avatars ${className}`}>
      {users.slice(0, 3).map(user => (
        <img
          key={user.id}
          src={user.image ?? '/images/members/user-3.webp'}
          className="schedule__avatar"
          alt={user.firstName}
        />
      ))}
      {users.length > 3 && (
        <span className="schedule__avatar schedule__avatar--more">+{users.length - 3}</span>
      )}
    </div>
  )
}
