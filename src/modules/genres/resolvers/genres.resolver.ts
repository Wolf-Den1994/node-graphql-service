import axios from 'axios';
import {
  IIDDefault, IGenreDataPost, IConfig, IGenreDataPut, IDataID,
} from '../../../utils/types';
import { genresUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    genres: async (_: any, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(genresUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    genre: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${genresUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Mutation: {
    createGenre: async (_: any, { content }: IGenreDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(genresUrl, content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    updateGenre: async (_: any, { id, ...body }: IGenreDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${genresUrl}/${id}`, body.content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    deleteGenre: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${genresUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
};
