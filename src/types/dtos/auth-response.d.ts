export interface IBasicUserDto {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface IAuthResponse {
  user: IBasicUserDto
  accessToken: string
}
