import axios from 'axios';
import {
  IIDDefault, IArtistDataPost, IConfig, IArtistDataPut, IDataID,
} from '../../../utils/types';
import { artistsUrl } from '../../../utils/constants';
import { transformData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    artists: async (_: any, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(artistsUrl, { params: { limit, offset, filter } });
      const newData = transformData(data);
      return newData;
    },
    artist: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${artistsUrl}/${id}`);
      const newData = transformData(data);
      return newData;
    },
  },
  Mutation: {
    createArtist: async (_: any, { content }: IArtistDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(artistsUrl, content, context.config);
        const newData = transformData(data);
        console.log('newData', newData);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    updateArtist: async (_: any, { id, ...body }: IArtistDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${artistsUrl}/${id}`, body.content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    deleteArtist: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${artistsUrl}/${id}`, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
  },
};
