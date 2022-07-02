export interface IID {
  _id: string
}

export interface IConfig {
  config: {
    headers: {
      Authorization: string
    }
  }
}

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

export interface IArtistPost {
  firstName: string
  secondName: string
  country: string
}

export interface IArtistID {
  id: string
}

export interface IArtistPut extends IArtistID {
  content: IArtistPost
}
