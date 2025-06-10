export interface IBasicUserDto {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
}

export interface IUserDto extends IBasicUserDto {
  contacts: IUser[]
}
