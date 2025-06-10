export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
  contacts: IUser[]
}

export type UserId = Pick<IUser, 'id'>
