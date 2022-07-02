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

export interface IDataID {
  id: string
}

export interface IArtistData {
  firstName: string
  secondName: string
  country: string
}

export interface IArtistDataPost {
  content: IArtistData
}

export interface IArtistDataPut extends IDataID {
  content: IArtistData
}

export interface IAlbumData {
  name: string
}

export interface IAlbumDataPost {
  content: IAlbumData
}

export interface IAlbumDataPut extends IDataID {
  content: IAlbumData
}
