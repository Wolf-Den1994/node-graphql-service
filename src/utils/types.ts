export interface IID {
  _id: string
}

export interface INewUser {
  firstName: string
  lastName: string
  password: string
  email: string
}

export interface IUserLogin {
  password: string
  email: string
}

export interface IArtistPost {
  firstName: string
  secondName: string
  country: string
}

export interface IConfig {
  config: {
    headers: {
      Authorization: string
    }
  }
}
