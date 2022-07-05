import axios from 'axios';
import {
  IIDDefault, IArtistDataPost, IConfig, IArtistDataPut, IDataID,
} from '../../../utils/types';
import { artistsUrl, bandsUrl } from '../../../utils/constants';
import {
  transformRequestData, transformResponseData, errorHandler, moreRequestsById,
} from '../../../utils/common';

export const resolver = {
  Query: {
    artists: async (_: any, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(artistsUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    artist: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${artistsUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Artist: {
    bands: async (parent: any) => {
      const result = { ...parent };
      if (parent.bandsIds) {
        result.bands = moreRequestsById(parent.bandsIds, bandsUrl);
      }
      return result.bands;
    },
  },
  Mutation: {
    createArtist: async (_: any, { content }: IArtistDataPost, context: IConfig) => {
      try {
        const dataReq = transformRequestData(content);
        const res = await axios.post(artistsUrl, dataReq, context.config);
        const dataRes = transformResponseData(res.data);
        return dataRes;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    updateArtist: async (_: any, { id, ...body }: IArtistDataPut, context: IConfig) => {
      try {
        const dataReq = transformRequestData(body.content);
        const { data } = await axios.put(`${artistsUrl}/${id}`, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    deleteArtist: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${artistsUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
  },
};
