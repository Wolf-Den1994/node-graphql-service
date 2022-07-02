import axios from 'axios';
import {
  IID, ITrackDataPost, IConfig, ITrackDataPut, IDataID,
} from '../../../utils/types';
import { tracksUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    tracks: async () => {
      const { data } = await axios.get(tracksUrl);
      console.log('data', data);
      return data;
    },
    track: async (_: any, { _id }: IID) => {
      const { data } = await axios.get(`${tracksUrl}/${_id}`);
      return data;
    },
  },
  Mutation: {
    createTrack: async (_: any, { content }: ITrackDataPost, context: IConfig) => {
      try {
        console.log('body', content);
        const { data } = await axios.post(tracksUrl, content, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
    updateTrack: async (_: any, { id, ...body }: ITrackDataPut, context: IConfig) => {
      try {
        console.log('body', body, id);
        const { data } = await axios.put(`${tracksUrl}/${id}`, body.content, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteTrack: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${tracksUrl}/${id}`, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};
