import { IID } from '../../../utils/types';

export interface ITrackData {
  name: string
}

export interface ITrackDataPost {
  content: ITrackData
}

export interface ITrackDataPut extends IID {
  content: ITrackData
}
