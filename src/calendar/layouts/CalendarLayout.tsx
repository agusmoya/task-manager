import { Header } from '../../task-manager/components/header/Header';

type Props = {
  children: React.ReactNode;
};

import './CalendarLayout.css';

export const CalendarLayout = ({ children }: Props) => {
  return (
    <>
      <Header userName='Natt' />
      <main className="main">
        <div className="calendar-container">
          {children}
        </div>
      </main>
    </>
  );
}