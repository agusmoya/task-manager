export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  image: string
  contacts: IUser[]
}

export type UserId = Pick<IUser, 'id'>
