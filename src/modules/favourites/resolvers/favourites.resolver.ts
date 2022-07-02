import axios from 'axios';
import { IIDDefault, IConfig } from '../../../utils/types';
import { favouritesUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    favourites: async (_: any, __: any, context: IConfig) => {
      const { data } = await axios.get(favouritesUrl, context.config);
      console.log('data', data);
      return data;
    },
  },
  Mutation: {
    addTrackToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'tracks' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
    addBandToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'bands' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
    addArtistToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'artists' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
    addGenreToFavourites: async (_: any, { id }: IIDDefault, context: IConfig) => {
      try {
        const body = { id, type: 'genres' };
        const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
  },
};
