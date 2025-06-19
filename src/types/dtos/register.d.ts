export interface IRegisterDto {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IAuthResponseDto {
  user: IUserDto
  accessToken: string
}
