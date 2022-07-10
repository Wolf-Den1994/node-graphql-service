import axios from 'axios';
import { IID, IConfig } from '../../../utils/types';
import { IArtistDataPut, IArtistDataPost } from '../models/artists.model';
import { artistsUrl, bandsUrl } from '../../../utils/constants';
import {
  transformRequestData, transformResponseData, errorHandler, moreRequestsById,
} from '../../../utils/common';

export const resolver = {
  Query: {
    artists: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(artistsUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    artist: async (_, { id }: IID) => {
      const { data } = await axios.get(`${artistsUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Artist: {
    bands: async (parent) => {
      const result = { ...parent };
      if (parent.bandsIds) {
        result.bands = await moreRequestsById(parent.bandsIds, bandsUrl);
      }
      return result.bands;
    },
  },
  Mutation: {
    createArtist: async (_, { content }: IArtistDataPost, context: IConfig) => {
      try {
        const dataReq = transformRequestData(content);
        const { data } = await axios.post(artistsUrl, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    updateArtist: async (_, { id, ...body }: IArtistDataPut, context: IConfig) => {
      try {
        const dataReq = transformRequestData(body.content);
        const { data } = await axios.put(`${artistsUrl}/${id}`, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    deleteArtist: async (_, { id }: IID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${artistsUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
};
