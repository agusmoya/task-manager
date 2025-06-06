export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  contacts: User[]
}

export type UserId = Pick<IUser, 'id'>
