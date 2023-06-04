export interface IRegistrationData {
  firstName: string
  lastName: string
  password: string
  email: string
}

export interface INewUser {
  content: IRegistrationData
}

export interface IUserLogin {
  password: string
  email: string
}
