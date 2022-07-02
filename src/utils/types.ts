export interface IID {
  _id: string
}

export interface IIDDefault {
  id: string
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

export interface IBandData {
  name: string
}

export interface IBandDataPost {
  content: IBandData
}

export interface IBandDataPut extends IDataID {
  content: IBandData
}

export interface IGenreData {
  name: string
}

export interface IGenreDataPost {
  content: IGenreData
}

export interface IGenreDataPut extends IDataID {
  content: IGenreData
}

export interface ITrackData {
  name: string
}

export interface ITrackDataPost {
  content: ITrackData
}

export interface ITrackDataPut extends IDataID {
  content: ITrackData
}
