import axios from 'axios';
import {
  IID, IAlbumDataPost, IConfig, IAlbumDataPut, IDataID,
} from '../../../utils/types';
import { albumsUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    albums: async () => {
      const { data } = await axios.get(albumsUrl);
      return data;
    },
    album: async (_: any, { _id }: IID) => {
      const { data } = await axios.get(`${albumsUrl}/${_id}`);
      return data;
    },
  },
  Mutation: {
    createAlbum: async (_: any, { content }: IAlbumDataPost, context: IConfig) => {
      try {
        console.log('body', content);
        const { data } = await axios.post(albumsUrl, content, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
    updateAlbum: async (_: any, { id, ...body }: IAlbumDataPut, context: IConfig) => {
      try {
        console.log('body', body);
        const { data } = await axios.put(`${albumsUrl}/${id}`, body.content, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteAlbum: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${albumsUrl}/${id}`, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};
