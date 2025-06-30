import { Button } from '../../../components/button/Button'
import { ArrowRightIcon, ArrowLeftIcon } from '../../../components/icons/Icons'

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
    <Button variant="fab" className="fab-month" onClick={handleClickNext}>
      {direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </Button>
  )
}
