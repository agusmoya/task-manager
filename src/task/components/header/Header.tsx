import { Link } from 'react-router-dom'

import { Dropdown } from '../../../components/dropdown/Dropdown'
import { ButtonTheme } from '../../../components/button-theme/ButtonTheme'
import { useAuthActions } from '../../../store/hooks/useAuthActions'

import './Header.css'

export const Header = () => {
  const imgLogo = '/images/icon-todo.webp'
  const { user, logout } = useAuthActions()

  return (
    <header className="header-app" id="header-app">
      <div className="header-app__nav container">
        <div className="nav__logo">
          <Link className="nav__logo-text" to="/home">
            ToDo&nbsp;
            <img className="nav__logo-img" src={imgLogo} alt="logo-app" />
          </Link>
        </div>
        {user ? (
          <Dropdown>
            <header role="menuitem" className="dropdown__menu-item--header">
              <h3>{user?.firstName}</h3>
            </header>
            <div role="menuitem" className="dropdown__menu-item">
              Select theme:&nbsp;
              <ButtonTheme />
            </div>
            <button role="menuitem" type="button" className="dropdown__menu-item">
              Profile
            </button>
            <button
              role="menuitem"
              type="button"
              className="dropdown__menu-item"
              onClick={() => logout()}
            >
              Logout
            </button>
          </Dropdown>
        ) : (
          <ButtonTheme />
        )}
      </div>
    </header>
  )
}
