export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

export type UserId = Pick<User, "id">
