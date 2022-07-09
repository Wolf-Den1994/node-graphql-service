import axios from 'axios';
import {
  IIDDefault, IBandDataPost, IConfig, IBandDataPut, IDataID,
} from '../../../utils/types';
import { artistsUrl, bandsUrl, genresUrl } from '../../../utils/constants';
import {
  moreRequestsById, transformRequestData, transformResponseData, errorHandler,
} from '../../../utils/common';

export const resolver = {
  Query: {
    bands: async (_: any, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(bandsUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    band: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${bandsUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Band: {
    genres: async (parent: any) => {
      const result = { ...parent };
      if (parent.genresIds) {
        result.bands = await moreRequestsById(parent.genresIds, genresUrl);
      }
      return result.bands;
    },
    members: async (parent: any) => {
      const result = { ...parent };
      if (parent.members) {
        const ids = parent.members.map(({ artist }: any) => artist);
        result.members = await moreRequestsById(ids, artistsUrl);
        const artistsResult = result.members.map((member: any) => {
          const artistFind = parent.members.find(({ artist }: any) => artist === member.id);
          if (artistFind) {
            return {
              artist: member.id,
              ...member,
              ...artistFind,
            };
          }
          return member;
        });
        return artistsResult;
      }
      return result.members;
    },
  },
  Mutation: {
    createBand: async (_: any, { content }: IBandDataPost, context: IConfig) => {
      try {
        const dataReq = transformRequestData(content);
        const { data } = await axios.post(bandsUrl, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    updateBand: async (_: any, { id, ...body }: IBandDataPut, context: IConfig) => {
      try {
        const dataReq = transformRequestData(body.content);
        const { data } = await axios.put(`${bandsUrl}/${id}`, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    deleteBand: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${bandsUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
  },
};
