import { IID, IConfig } from '../../../utils/types';
import { IBandDataPut, IBandDataPost } from '../models/bands.model';
import { BandsService } from '../services/bands.service';

const Bands = new BandsService();

export const resolver = {
  Query: {
    bands: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const data = await Bands.bands(limit, offset, filter);
      return data;
    },
    band: async (_, { id }: IID) => {
      const data = await Bands.band(id);
      return data;
    },
  },
  Band: {
    genres: async (parent) => {
      const data = await Bands.genres(parent);
      return data;
    },
    members: async (parent) => {
      const data = await Bands.members(parent);
      return data;
    },
  },
  Mutation: {
    createBand: async (_, content: IBandDataPost, context: IConfig) => {
      const data = await Bands.createBand(content, context);
      return data;
    },
    updateBand: async (_, content: IBandDataPut, context: IConfig) => {
      const data = await Bands.createBand(content, context);
      return data;
    },
    deleteBand: async (_, { id }: IID, context: IConfig) => {
      const data = await Bands.deleteBand(id, context);
      return data;
    },
  },
};
