import React from "react";

import './CircularProgress.css'

interface CircularProgressProps {
  progress: number; // Valor entre 0 y 100
  size?: number; // Tamaño del círculo (opcional)
  strokeWidth?: number; // Grosor de la barra (opcional)
  strokeColor?: string; // Color del progreso (opcional)
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 45,
  strokeWidth = 3,
  strokeColor = "var(--color-outline-variant)",
}) => {
  const radius = (size - strokeWidth) / 2 - 0.5
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div
      className="circular__progress"
      style={{ width: size + 5, height: size + 5 }}
    >
      <svg
        width={size}
        height={size}
      >
        {/* Fondo del círculo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-outline)"
          strokeWidth={strokeWidth}
        />
        {/* Barra de progreso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="circular__progress-text">
        {progress}%
      </span>
    </div>
  )
}
