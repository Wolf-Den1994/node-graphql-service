import { IID, IConfig } from '../../../utils/types';
import { IGenreDataPost, IGenreDataPut } from '../models/genres.model';
import { GenresService } from '../services/genres.service';

const Genres = new GenresService();

export const resolver = {
  Query: {
    genres: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const data = await Genres.genres(limit, offset, filter);
      return data;
    },
    genre: async (_, { id }: IID) => {
      const data = await Genres.genre(id);
      return data;
    },
  },
  Mutation: {
    createGenre: async (_, content: IGenreDataPost, context: IConfig) => {
      const data = await Genres.createGenre(content, context);
      return data;
    },
    updateGenre: async (_, content: IGenreDataPut, context: IConfig) => {
      const data = await Genres.updateGenre(content, context);
      return data;
    },
    deleteGenre: async (_, { id }: IID, context: IConfig) => {
      const data = await Genres.deleteGenre(id, context);
      return data;
    },
  },
};
