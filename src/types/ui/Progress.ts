export const COLOR_PROGRESS = {
  default: 'default',
  completed: 'completed',
  progress: 'progress',
  pending: 'pending',
  info: 'info',
  error: 'error',
} as const

export type ColorProgressType = (typeof COLOR_PROGRESS)[keyof typeof COLOR_PROGRESS]
