import axios from 'axios';
import {
  IID, IArtistPost, IConfig, IArtistPut, IArtistID,
} from '../../../utils/types';
import { artistsUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    artists: async () => {
      const { data } = await axios.get(artistsUrl);
      return data.items;
    },
    artist: async (_: any, { _id }: IID) => {
      const { data } = await axios.get(`${artistsUrl}/${_id}`);
      return data;
    },
  },
  Mutation: {
    create: async (_: any, body: IArtistPost, context: IConfig) => {
      try {
        const { data } = await axios.post(artistsUrl, body, context.config);
        return data;
      } catch (error) {
        return error;
      }
    },
    update: async (_: any, { id, ...body }: IArtistPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${artistsUrl}/${id}`, body.content, context.config);
        return data;
      } catch (error) {
        return error;
      }
    },
    delete: async (_: any, { id }: IArtistID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${artistsUrl}/${id}`, context.config);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};
