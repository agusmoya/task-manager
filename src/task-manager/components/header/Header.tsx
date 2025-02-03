import { Tasks } from "../../../types/types";
import { ButtonTheme } from "../button-theme/ButtonTheme";

import "./Header.css";

interface Props {
  userName: string;
  pendingTasks?: Tasks;
}

export const Header: React.FC<Props> = ({ userName, pendingTasks = [] }) => {
  // const params = useParams();
  // console.log(params['*']);

  return (
    <header className="header-app" id="header-app">
      <nav className="nav container">
        <div className="user-info">
          <h1>Hi {userName}</h1>
          <small>{pendingTasks?.length} pending tasks</small>
        </div>
        <img
          className="user-profile__image"
          src="/images/members/user-1.webp"
          alt="random user profile photo"
        />
        <ButtonTheme />
      </nav>
    </header>
  );
};
