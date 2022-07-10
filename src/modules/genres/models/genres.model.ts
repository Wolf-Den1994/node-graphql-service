import { IID } from '../../../utils/types';

export interface IGenreData {
  name: string
}

export interface IGenreDataPost {
  content: IGenreData
}

export interface IGenreDataPut extends IID {
  content: IGenreData
}
