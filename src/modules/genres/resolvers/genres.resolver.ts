import axios from 'axios';
import {
  IIDDefault, IGenreDataPost, IConfig, IGenreDataPut, IDataID,
} from '../../../utils/types';
import { genresUrl } from '../../../utils/constants';
import { transformData } from '../../../utils/common';

export const resolver = {
  Query: {
    genres: async () => {
      const { data } = await axios.get(genresUrl);
      const newData = transformData(data);
      return newData;
    },
    genre: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${genresUrl}/${id}`);
      const newData = transformData(data);
      return newData;
    },
  },
  Mutation: {
    createGenre: async (_: any, { content }: IGenreDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(genresUrl, content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error: any) {
        return error;
      }
    },
    updateGenre: async (_: any, { id, ...body }: IGenreDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${genresUrl}/${id}`, body.content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
    deleteGenre: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${genresUrl}/${id}`, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
  },
};
