export const AUTH_STATUS = {
  CHECKING: 'checking',
  AUTHORIZED: 'authorized',
  UNAUTHORIZED: 'unauthorized',
} as const;

export type AuthStatusType = typeof AUTH_STATUS[keyof typeof AUTH_STATUS];