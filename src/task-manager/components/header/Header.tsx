import { Link } from 'react-router-dom';

import { Dropdown } from '../../../component/dropdown/Dropdown.tsx';
import { ButtonTheme } from '../button-theme/ButtonTheme.tsx';

import { type Tasks } from "../../../types/types.d";

import { useAuthActions } from "../../../store/hooks/useAuthActions.ts";

import "./Header.css";

interface Props {
  pendingTasks?: Tasks;
}

export const Header: React.FC<Props> = () => {
  const imgLogo = "/images/icon-todo.webp"
  const { user, startLogout } = useAuthActions()

  return (
    <header className="header-app" id="header-app">
      <nav className="nav container">
        {
          (user)
            ?
            <>
              <div className="nav__logo">
                <Link className="nav__logo-text" to='/'>
                  ToDo&nbsp;
                  <img className="nav__logo-img" src={imgLogo} alt="logo-app" />
                </Link>
              </div>

              <Dropdown>
                <header role="menuitem" className="dropdown__menu-item--header">
                  <h3>{user?.firstName}</h3>
                </header>
                <div role="menuitem" className="dropdown__menu-item">
                  Select theme:&nbsp;<ButtonTheme />
                </div>
                <button
                  role="menuitem"
                  type="button"
                  className="dropdown__menu-item"
                >
                  Profile
                </button>
                <button
                  role="menuitem"
                  type="button"
                  className="dropdown__menu-item"
                  onClick={startLogout}
                >
                  Logout
                </button>
              </Dropdown>
            </>
            :
            <>
              <div className="nav__logo">
                <a href='/' className="nav__logo-text">
                  ToDo&nbsp;
                  <img className="nav__logo-img" src={imgLogo} alt="logo-app" />
                </a>
              </div>
              <ButtonTheme />
            </>
        }
      </nav>
    </header>
  )
}
