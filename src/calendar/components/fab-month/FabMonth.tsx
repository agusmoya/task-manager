import { NextIcon, PreviousIcon } from '../../../components/icons/Icons.tsx'

import './FabMonth.css'

type FabMonthProps = {
  direction: 'left' | 'right'
  onHandleClick: () => void
}

export const FabMonth = ({ direction, onHandleClick }: FabMonthProps) => {
  const handleClickNext = () => {
    onHandleClick()
  }

  return (
    <button
      className="btn btn--fab fab-month"
      onClick={handleClickNext}
    >
      <span className="btn__state-layer"></span>
      <span className="btn__content">
        {direction === 'left' ? <PreviousIcon /> : <NextIcon />}
      </span>
    </button>
  )
}
