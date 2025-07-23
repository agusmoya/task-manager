import './CircularProgress.css'

export const CircularProgress = ({ progress }: { progress: number }) => {
  return (
    <div
      className="circular-progress"
      style={{ '--progress': `${progress}%` } as React.CSSProperties}
    >
      <span>{progress}%</span>
    </div>
  )
}
