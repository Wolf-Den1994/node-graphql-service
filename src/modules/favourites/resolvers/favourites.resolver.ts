import axios from 'axios';
import { IIDDefault, IConfig } from '../../../utils/types';
import {
  favouritesUrl, bandsUrl, genresUrl, artistsUrl, tracksUrl,
} from '../../../utils/constants';
import { transformResponseData, errorHandler, moreRequestsById } from '../../../utils/common';

export const resolver = {
  Query: {
    favourites: async (_: any, __: any, context: IConfig) => {
      const { data } = await axios.get(favouritesUrl, context.config);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Favourites: {
    bands: async (parent: any) => {
      const result = { ...parent };
      if (parent.bandsIds) {
        result.bands = await moreRequestsById(parent.bandsIds, bandsUrl);
      }
      return result.bands;
    },
    genres: async (parent: any) => {
      const result = { ...parent };
      if (parent.genresIds) {
        result.genres = await moreRequestsById(parent.genresIds, genresUrl);
      }
      return result.genres;
    },
    artists: async (parent: any) => {
      const result = { ...parent };
      if (parent.artistsIds) {
        result.artists = await moreRequestsById(parent.artistsIds, artistsUrl);
      }
      return result.artists;
    },
    tracks: async (parent: any) => {
      const result = { ...parent };
      if (parent.tracksIds) {
        result.tracks = await moreRequestsById(parent.tracksIds, tracksUrl);
      }
      return result.tracks;
    },
  },
  Mutation: {
    addTrackToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'tracks' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    addBandToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'bands' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    addArtistToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'artists' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    addGenreToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'genres' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    removeTrackToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'tracks' };
        const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    removeBandToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'bands' };
        const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    removeArtistToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'artists' };
        const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    removeGenreToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'genres' };
        const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
};
