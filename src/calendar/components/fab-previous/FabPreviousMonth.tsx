import { PreviousIcon } from '../../../component/icons/Icons.tsx';

import './FabPreviousMonth.css';

type FabPreviousMonthProps = {
  onClickPrev: () => void
}

export const FabPreviousMonth = ({ onClickPrev }: FabPreviousMonthProps) => {
  const handleClickPrevMonth = () => {
    onClickPrev()
  }

  return (
    <button className="fab-previous" onClick={handleClickPrevMonth}>
      <PreviousIcon size={20} />
    </button>
  )
}
