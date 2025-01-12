import { Tasks } from "../../../types/types";
import { ButtonTheme } from "../theme/button-theme";
import "./Header.css";

interface Props {
  userName: string;
  pendingTasks: Tasks;
}

export const Header: React.FC<Props> = ({ userName, pendingTasks }) => {
  return (
    <header className="header-app" id="header-app">
      <nav className="nav container">
        <div className="user-info">
          <h1>Hi {userName}</h1>
          <small>{pendingTasks.length} pending tasks</small>
        </div>
        <img
          className="user-profile__image"
          src="images/photo-user-random.webp"
          alt="random user profile photo"
        />
        <ButtonTheme />
      </nav>
    </header>
  );
};
