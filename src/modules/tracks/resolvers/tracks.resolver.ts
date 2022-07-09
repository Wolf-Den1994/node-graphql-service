import axios from 'axios';
import {
  IIDDefault, ITrackDataPost, IConfig, ITrackDataPut, IDataID,
} from '../../../utils/types';
import {
  albumsUrl, artistsUrl, bandsUrl, genresUrl, tracksUrl,
} from '../../../utils/constants';
import {
  transformRequestData, transformResponseData, errorHandler, moreRequestsById, requestsById,
} from '../../../utils/common';

export const resolver = {
  Query: {
    tracks: async (_: any, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(tracksUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    track: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${tracksUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Track: {
    album: async (parent: any) => {
      const result = { ...parent };
      if (parent.albumId) {
        result.album = await requestsById(parent.albumId, albumsUrl);
      }
      return result.album;
    },
    artists: async (parent: any) => {
      const result = { ...parent };
      if (parent.artistsIds) {
        result.artists = await moreRequestsById(parent.artistsIds, artistsUrl);
      }
      return result.artists;
    },
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
  },
  Mutation: {
    createTrack: async (_: any, { content }: ITrackDataPost, context: IConfig) => {
      try {
        const dataReq = transformRequestData(content);
        const { data } = await axios.post(tracksUrl, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
    updateTrack: async (_: any, { id, ...body }: ITrackDataPut, context: IConfig) => {
      try {
        const dataReq = transformRequestData(body.content);
        const { data } = await axios.put(`${tracksUrl}/${id}`, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    deleteTrack: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${tracksUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
};
