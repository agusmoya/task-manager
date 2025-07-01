import './LinearProgress.css'

interface Props {
  value: number
  showLabel?: boolean
}

export const LinearProgress = ({ value, showLabel = false }: Props) => {
  return (
    <div className="linear-progress-wrapper">
      <div
        className="linear-progress"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="linear-progress__bar" style={{ width: `${value}%` }} />
      </div>
      {showLabel && <span className="linear-progress__label">{value}%</span>}
    </div>
  )
}
