import axios from 'axios';
import { IID, IConfig } from '../../../utils/types';
import { IGenreDataPost, IGenreDataPut } from '../models/genres.model';
import { genresUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    genres: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(genresUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    genre: async (_, { id }: IID) => {
      const { data } = await axios.get(`${genresUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Mutation: {
    createGenre: async (_, { content }: IGenreDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(genresUrl, content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    updateGenre: async (_, { id, ...body }: IGenreDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${genresUrl}/${id}`, body.content, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    deleteGenre: async (_, { id }: IID, context: IConfig) => {
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
