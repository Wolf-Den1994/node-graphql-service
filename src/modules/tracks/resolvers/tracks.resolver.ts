import axios from 'axios';
import {
  IIDDefault, ITrackDataPost, IConfig, ITrackDataPut, IDataID,
} from '../../../utils/types';
import { tracksUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    tracks: async (_: any, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(tracksUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    track: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${tracksUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Mutation: {
    createTrack: async (_: any, { content }: ITrackDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(tracksUrl, content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    updateTrack: async (_: any, { id, ...body }: ITrackDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${tracksUrl}/${id}`, body.content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    deleteTrack: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${tracksUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
};
