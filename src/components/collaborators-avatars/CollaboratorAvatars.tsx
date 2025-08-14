import { IUser } from '../../types/user'
import { UserAvatar } from '../user-avatar/UserAvatar'

import './CollaboratorAvatars.css'

interface Props {
  users: IUser[]
  className?: string
}

export const CollaboratorAvatars = ({ users, className = '' }: Props) => {
  return (
    <div className={`schedule__avatars ${className}`}>
      {users.slice(0, 3).map(user => {
        const { id, profileImageURL, firstName, lastName } = user
        return (
          <UserAvatar
            className="schedule__avatar"
            key={id}
            imageUrl={profileImageURL}
            firstName={firstName}
            lastName={lastName}
            ariaLabel="User menu"
          />
        )
      })}
      {users.length > 3 && (
        <span className="schedule__avatar schedule__avatar--more">+{users.length - 3}</span>
      )}
    </div>
  )
}
