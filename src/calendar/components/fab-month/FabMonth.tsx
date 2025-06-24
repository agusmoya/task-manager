import { Button } from '../../../components/button/Button'
import { NextIcon, PreviousIcon } from '../../../components/icons/Icons'

import './FabMonth.css'

interface FabMonthProps {
  direction: 'left' | 'right'
  onHandleClick: () => void
}

export const FabMonth = ({ direction, onHandleClick }: FabMonthProps) => {
  const handleClickNext = () => {
    onHandleClick()
  }

  return (
    <Button className="btn btn--fab fab-month" onClick={handleClickNext}>
      {direction === 'left' ? <PreviousIcon /> : <NextIcon />}
    </Button>
  )
}
