import axios from 'axios';
import {
  IID, IGenreDataPost, IConfig, IGenreDataPut, IDataID,
} from '../../../utils/types';
import { genresUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    genres: async () => {
      const { data } = await axios.get(genresUrl);
      console.log('data', data);
      return data;
    },
    genre: async (_: any, { _id }: IID) => {
      const { data } = await axios.get(`${genresUrl}/${_id}`);
      return data;
    },
  },
  Mutation: {
    createGenre: async (_: any, { content }: IGenreDataPost, context: IConfig) => {
      try {
        console.log('body', content);
        const { data } = await axios.post(genresUrl, content, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
    updateGenre: async (_: any, { id, ...body }: IGenreDataPut, context: IConfig) => {
      try {
        console.log('body', body);
        const { data } = await axios.put(`${genresUrl}/${id}`, body.content, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteGenre: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${genresUrl}/${id}`, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};
