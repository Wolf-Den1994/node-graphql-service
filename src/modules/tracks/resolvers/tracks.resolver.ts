import axios from 'axios';
import {
  IIDDefault, ITrackDataPost, IConfig, ITrackDataPut, IDataID,
} from '../../../utils/types';
import { tracksUrl } from '../../../utils/constants';
import { transformData } from '../../../utils/common';

export const resolver = {
  Query: {
    tracks: async () => {
      const { data } = await axios.get(tracksUrl);
      const newData = transformData(data);
      return newData;
    },
    track: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${tracksUrl}/${id}`);
      const newData = transformData(data);
      return newData;
    },
  },
  Mutation: {
    createTrack: async (_: any, { content }: ITrackDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(tracksUrl, content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error: any) {
        return error;
      }
    },
    updateTrack: async (_: any, { id, ...body }: ITrackDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${tracksUrl}/${id}`, body.content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
    deleteTrack: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${tracksUrl}/${id}`, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
  },
};
