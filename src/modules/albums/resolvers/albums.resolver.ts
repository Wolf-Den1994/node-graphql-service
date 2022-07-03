import axios from 'axios';
import {
  IIDDefault, IAlbumDataPost, IConfig, IAlbumDataPut, IDataID,
} from '../../../utils/types';
import { albumsUrl } from '../../../utils/constants';
import { transformData } from '../../../utils/common';

export const resolver = {
  Query: {
    albums: async () => {
      const { data } = await axios.get(albumsUrl);
      const newData = transformData(data);
      return newData;
    },
    album: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${albumsUrl}/${id}`);
      const newData = transformData(data);
      return newData;
    },
  },
  Mutation: {
    createAlbum: async (_: any, { content }: IAlbumDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(albumsUrl, content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error: any) {
        return error;
      }
    },
    updateAlbum: async (_: any, { id, ...body }: IAlbumDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${albumsUrl}/${id}`, body.content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
    deleteAlbum: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${albumsUrl}/${id}`, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
  },
};
