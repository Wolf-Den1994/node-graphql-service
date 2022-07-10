import { IID, IConfig } from '../../../utils/types';
import { IArtistDataPut, IArtistDataPost } from '../models/artists.model';
import { ArtistsService } from '../services/artists.service';

const Artists = new ArtistsService();

export const resolver = {
  Query: {
    artists: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const data = await Artists.artists(limit, offset, filter);
      return data;
    },
    artist: async (_, { id }: IID) => {
      const data = await Artists.artist(id);
      return data;
    },
  },
  Artist: {
    bands: async (parent) => {
      const data = await Artists.bands(parent);
      return data;
    },
  },
  Mutation: {
    createArtist: async (_, content: IArtistDataPost, context: IConfig) => {
      const data = await Artists.createArtist(content, context);
      return data;
    },
    updateArtist: async (_, content: IArtistDataPut, context: IConfig) => {
      const data = await Artists.updateArtist(content, context);
      return data;
    },
    deleteArtist: async (_, { id }: IID, context: IConfig) => {
      const data = await Artists.deleteArtist(id, context);
      return data;
    },
  },
};
