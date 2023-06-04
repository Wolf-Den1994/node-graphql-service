import { IID } from '../../../utils/types';

export interface IArtistData {
  firstName: string
  secondName: string
  country: string
}

export interface IArtistDataPost {
  content: IArtistData
}

export interface IArtistDataPut extends IID {
  content: IArtistData
}
