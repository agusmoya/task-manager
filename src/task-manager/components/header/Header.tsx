import { Dropdown } from '../../../component/dropdown/Dropdown.tsx';
import { ButtonTheme } from '../button-theme/ButtonTheme.tsx';

import { type Tasks } from "../../../types/types.d";

import { useAuthActions } from "../../../store/hooks/useAuthActions.ts";


import "./Header.css";

interface Props {
  pendingTasks?: Tasks;
}

export const Header: React.FC<Props> = ({ pendingTasks = [] }) => {
  const { user, startLogout } = useAuthActions()

  return (
    <header className="header-app" id="header-app">
      <nav className="nav container">
        <div className="user-info">
          <h1>Hi {user?.name}</h1>
          <small>{pendingTasks?.length} pending tasks</small>
        </div>
        <Dropdown >
          <header role="menuitem" className="dropdown__menu-item--header">
            <h3>{user?.name}</h3>
          </header>
          <div role="menuitem" className="dropdown__menu-item">
            <ButtonTheme />
          </div>
          <button role="menuitem" type="button" className="dropdown__menu-item">Profile</button>
          <button role="menuitem" type="button" className="dropdown__menu-item" onClick={startLogout}>
            Logout
          </button>
        </Dropdown>
      </nav>
    </header>
  )
}
