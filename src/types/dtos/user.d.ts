export interface IUpdateUserDto {
  firstName: string
  lastName: string
  profileImageURL: string
}

export interface IUserDto {
  contacts: IUser[]
}
