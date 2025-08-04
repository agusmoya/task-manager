import { useMemo } from 'react'

import { Dropdown } from '../dropdown/Dropdown'
import { Button } from '../button/Button'
import { ButtonLink } from '../button-link/ButtonLink'
import { ButtonTheme } from '../button-theme/ButtonTheme'
import { UserAvatar } from '../user-avatar/UserAvatar'
import { UserSettingIcon, LogoutIcon } from '../icons/Icons'

import { TASK_STATUS } from '../../types/task.d'

import { useAuthActions } from '../../store/hooks/useAuthActions'
import { useTaskActions } from '../../store/hooks/useTaskActions'

import './AvatarDropdown.css'

/**
 * Reusable avatar dropdown component for user menu
 * Displays user avatar with dropdown containing profile info and navigation
 * @returns JSX.Element - Avatar dropdown with user menu
 */
export const AvatarDropdown = () => {
  const { user, logout } = useAuthActions()
  const { tasks } = useTaskActions()

  /**
   * Calculate pending tasks count for user dashboard
   * @returns number - Count of tasks with PENDING status
   */
  const pendingTasksCount = useMemo(
    () => tasks.filter(task => task.status === TASK_STATUS.PENDING).length,
    [tasks]
  )

  const handleSignOut = () => {
    logout()
  }

  // Guard clause for when user is not loaded
  if (!user) return null

  return (
    <Dropdown
      className="user-dropdown"
      trigger={
        <UserAvatar
          className="user-dropdown__trigger"
          imageUrl={user.profileImageURL}
          firstName={user.firstName}
          lastName={user.lastName}
          size="md"
          ariaLabel="User menu"
        />
      }
    >
      <div className="user-dropdown__content">
        <div className="user-dropdown__header">
          <div className="user-dropdown__info">
            <span className="user-dropdown__name">
              {user.firstName} {user.lastName}
            </span>
            <small className="user-dropdown__tasks">
              {pendingTasksCount === 1 ? '1 pending task' : `${pendingTasksCount} pending tasks`}
            </small>
          </div>

          <ButtonTheme />
        </div>

        <ButtonLink className="user-dropdown__menu-item" role="menuitem" to="/home/profile">
          <UserSettingIcon />
          <span>Profile</span>
        </ButtonLink>

        <Button
          className="user-dropdown__menu-item"
          variant="text"
          role="menuitem"
          onClick={handleSignOut}
        >
          <LogoutIcon />
          <span>Sign out</span>
        </Button>
      </div>
    </Dropdown>
  )
}
