import { Link } from 'react-router-dom'

import { Dropdown } from '../../../components/dropdown/Dropdown'
import { ButtonTheme } from '../../../components/button-theme/ButtonTheme'
import { LogoutIcon, UserSettingIcon } from '../../../components/icons/Icons'
import { ButtonLink } from '../../../components/button-link/ButtonLink'
import { Button } from '../../../components/button/Button'

import { useAuthActions } from '../../../store/hooks/useAuthActions'

import './Header.css'

export const Header = () => {
  const imgLogo = '/images/todo.webp'
  const { user, logout } = useAuthActions()

  return (
    <header className="header-app">
      <nav className="header-app__nav container" aria-label="Profile navigation">
        <Link className="header-app__logo" to={user ? '/home' : '/auth/login'}>
          <img className="header-app__logo-img" src={imgLogo} alt="ToDo logo" />
          &nbsp;
          <span className="header-app__logo-text">ToDo</span>
        </Link>
        {user ? (
          <Dropdown className="header-app__user-dropdown">
            <span className="dropdown__menu-item" role="menuitem">
              <p>Theme:</p>
              <ButtonTheme />
            </span>
            <ButtonLink className="dropdown__menu-item" role="menuitem" to="/home/profile">
              <UserSettingIcon />
              <span>Profile</span>
            </ButtonLink>
            <Button
              variant="text"
              className="dropdown__menu-item"
              role="menuitem"
              onClick={() => logout()}
            >
              <LogoutIcon />
              Logout
            </Button>
          </Dropdown>
        ) : (
          <ButtonTheme />
        )}
      </nav>
    </header>
  )
}
