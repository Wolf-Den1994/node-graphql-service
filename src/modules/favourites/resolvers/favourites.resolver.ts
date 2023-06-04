import { IID, IConfig } from '../../../utils/types';
import { FavouritesService } from '../services/favourites.service';

const Favourites = new FavouritesService();

export const resolver = {
  Query: {
    favourites: async (_, __, context: IConfig) => {
      const data = await Favourites.favourites(context);
      return data;
    },
  },
  Favourites: {
    bands: async (parent) => {
      const data = await Favourites.bands(parent);
      return data;
    },
    genres: async (parent) => {
      const data = await Favourites.genres(parent);
      return data;
    },
    artists: async (parent) => {
      const data = await Favourites.artists(parent);
      return data;
    },
    tracks: async (parent) => {
      const data = await Favourites.tracks(parent);
      return data;
    },
  },
  Mutation: {
    addTrackToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.addTrackToFavourites(id, context);
      return data;
    },
    addBandToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.addBandToFavourites(id, context);
      return data;
    },
    addArtistToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.addArtistToFavourites(id, context);
      return data;
    },
    addGenreToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.addGenreToFavourites(id, context);
      return data;
    },
    removeTrackToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.removeTrackToFavourites(id, context);
      return data;
    },
    removeBandToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.removeBandToFavourites(id, context);
      return data;
    },
    removeArtistToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.removeArtistToFavourites(id, context);
      return data;
    },
    removeGenreToFavourites: async (_, { id }: IID, context: IConfig) => {
      const data = await Favourites.removeGenreToFavourites(id, context);
      return data;
    },
  },
};
