import axios from 'axios';
import { IIDDefault, IConfig } from '../../../utils/types';
import { favouritesUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    favourites: async (_: any, __: any, context: IConfig) => {
      const { data } = await axios.get(favouritesUrl, context.config);
      const newData = transformResponseData(data);
      return newData;
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
  },
};
