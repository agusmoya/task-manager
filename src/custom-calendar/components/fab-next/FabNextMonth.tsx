import { NextIcon } from "../../icons/Icons.tsx";

import './FabNextMonth.css'

type FabNextMonthProps = {
  onClickNext: () => void
}

export const FabNextMonth = ({ onClickNext }: FabNextMonthProps) => {
  const handleClickNext = () => {
    onClickNext()
  }

  return (
    <button className="fab-next" onClick={handleClickNext}>
      <NextIcon size={20} />
    </button>
  )
}