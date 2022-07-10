import axios from 'axios';
import { IConfig } from '../../../utils/types';
import { IGenreDataPost, IGenreDataPut } from '../models/genres.model';
import { genresUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export class GenresService {
  async genres(limit = 5, offset = 0, filter = '') {
    const { data } = await axios.get(genresUrl, { params: { limit, offset, filter } });
    const newData = transformResponseData(data);
    return newData;
  }

  async genre(id: string) {
    const { data } = await axios.get(`${genresUrl}/${id}`);
    const newData = transformResponseData(data);
    return newData;
  }

  async createGenre({ content }: IGenreDataPost, context: IConfig) {
    try {
      const { data } = await axios.post(genresUrl, content, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async updateGenre({ id, ...body }: IGenreDataPut, context: IConfig) {
    try {
      const { data } = await axios.put(`${genresUrl}/${id}`, body.content, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async deleteGenre(id: string, context: IConfig) {
    try {
      const { data } = await axios.delete(`${genresUrl}/${id}`, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }
}
