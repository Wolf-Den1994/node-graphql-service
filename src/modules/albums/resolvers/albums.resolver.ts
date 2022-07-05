import axios from 'axios';
import {
  IIDDefault, IAlbumDataPost, IConfig, IAlbumDataPut, IDataID,
} from '../../../utils/types';
import { albumsUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    albums: async (_: any, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(albumsUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    album: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${albumsUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Mutation: {
    createAlbum: async (_: any, { content }: IAlbumDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(albumsUrl, content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    updateAlbum: async (_: any, { id, ...body }: IAlbumDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${albumsUrl}/${id}`, body.content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    deleteAlbum: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${albumsUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
  },
};
