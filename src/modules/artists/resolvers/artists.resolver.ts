import axios from 'axios';
import {
  IID, IArtistDataPost, IConfig, IArtistDataPut, IDataID,
} from '../../../utils/types';
import { artistsUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    artists: async () => {
      const { data } = await axios.get(artistsUrl);
      return data;
    },
    artist: async (_: any, { _id }: IID) => {
      const { data } = await axios.get(`${artistsUrl}/${_id}`);
      return data;
    },
  },
  Mutation: {
    createArtist: async (_: any, { content }: IArtistDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(artistsUrl, content, context.config);
        return data;
      } catch (error) {
        return error;
      }
    },
    updateArtist: async (_: any, { id, ...body }: IArtistDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${artistsUrl}/${id}`, body.content, context.config);
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteArtist: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${artistsUrl}/${id}`, context.config);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};
