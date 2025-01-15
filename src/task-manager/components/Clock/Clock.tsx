import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import './Clock.css';

interface Props {
  today: Dayjs;
}

export const Clock = ({ today }: Props) => {
  const [currentTime, setCurrentTime] = useState(today.format('hh:mm:ss A'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('hh:mm:ss A'));
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <>
      <time className='clock'>
        {currentTime}
      </time>
      <hr className="separator" />
    </>

  );
};