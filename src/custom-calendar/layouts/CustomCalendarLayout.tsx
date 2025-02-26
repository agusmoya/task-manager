import { Header } from '../../task-manager/components/header/Header';

type Props = {
  children: React.ReactNode;
};

export const CustomCalendarLayout = ({ children }: Props) => {
  return (
    <div>
      <Header userName='Natt' />
      <main className="main">
        {children}
      </main>
    </div>
  );
}