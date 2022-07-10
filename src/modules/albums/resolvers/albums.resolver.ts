import { IID, IConfig } from '../../../utils/types';
import { IAlbumDataPost, IAlbumDataPut } from '../models/albums.model';
import { AlbumsService } from '../services/albums.service';

const Albums = new AlbumsService();

export const resolver = {
  Query: {
    albums: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const data = await Albums.albums(limit, offset, filter);
      return data;
    },
    album: async (_, { id }: IID) => {
      const data = await Albums.album(id);
      return data;
    },
  },
  Album: {
    artists: async (parent) => {
      const data = await Albums.artists(parent);
      return data;
    },
    bands: async (parent) => {
      const data = await Albums.bands(parent);
      return data;
    },
    tracks: async (parent) => {
      const data = await Albums.tracks(parent);
      return data;
    },
    genres: async (parent) => {
      const data = await Albums.genres(parent);
      return data;
    },
  },
  Mutation: {
    createAlbum: async (_, content: IAlbumDataPost, context: IConfig) => {
      const data = await Albums.createAlbum(content, context);
      return data;
    },
    updateAlbum: async (_, content: IAlbumDataPut, context: IConfig) => {
      const data = await Albums.updateAlbum(content, context);
      return data;
    },
    deleteAlbum: async (_, { id }: IID, context: IConfig) => {
      const data = await Albums.deleteAlbum(id, context);
      return data;
    },
  },
};
