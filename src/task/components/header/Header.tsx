import { Link } from 'react-router-dom'

import { ButtonTheme } from '../../../components/button-theme/ButtonTheme'
import { NotificationDropdown } from '../../../components/notification-dropdown/NotificationDropdown'
import { AvatarDropdown } from '../../../components/avatar-dropdown/AvatarDropdown'

import { useAuthActions } from '../../../store/hooks/useAuthActions'

import './Header.css'

export const Header = () => {
  const imgLogo = '/images/todo.webp'
  const { isAuthenticated } = useAuthActions()

  return (
    <header className="header-app">
      <nav className="header-app__nav container" aria-label="Profile navigation">
        <Link className="header-app__logo" to={isAuthenticated ? '/home' : '/auth/login'}>
          <img className="header-app__logo-img" src={imgLogo} alt="ToDo logo" />
          &nbsp;
          <span className="header-app__logo-text">ToDo</span>
        </Link>
        {isAuthenticated ? (
          <div className="header-app__actions">
            <NotificationDropdown
              className="header-app__notifications-dropdown"
              maxNotifications={5}
              size="md"
            />

            <AvatarDropdown />
          </div>
        ) : (
          <ButtonTheme />
        )}
      </nav>
    </header>
  )
}
