import { IID } from '../../../utils/types';

export interface IAlbumData {
  name: string
}

export interface IAlbumDataPost {
  content: IAlbumData
}

export interface IAlbumDataPut extends IID {
  content: IAlbumData
}
