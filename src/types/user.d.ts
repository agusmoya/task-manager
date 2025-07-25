export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImageURL: string
  contacts: IUser[]
}

export type UserId = Pick<IUser, 'id'>

export interface IUserForm {
  email: string
  firstName: string
  lastName: string
  profileImageURL: string
  contacts: IUser[]
}
