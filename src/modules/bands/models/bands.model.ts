import { IID } from '../../../utils/types';

export interface IBandData {
  name: string
}

export interface IBandDataPost {
  content: IBandData
}

export interface IBandDataPut extends IID {
  content: IBandData
}
