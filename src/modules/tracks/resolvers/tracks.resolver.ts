import axios from 'axios';
import { IID, IConfig } from '../../../utils/types';
import { ITrackDataPost, ITrackDataPut } from '../models/tracks.model';
import {
  albumsUrl, artistsUrl, bandsUrl, genresUrl, tracksUrl,
} from '../../../utils/constants';
import {
  transformRequestData, transformResponseData, errorHandler, moreRequestsById, requestsById,
} from '../../../utils/common';

export const resolver = {
  Query: {
    tracks: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(tracksUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    track: async (_, { id }: IID) => {
      const { data } = await axios.get(`${tracksUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Track: {
    album: async (parent) => {
      const result = { ...parent };
      if (parent.albumId) {
        result.album = await requestsById(parent.albumId, albumsUrl);
      }
      return result.album;
    },
    artists: async (parent) => {
      const result = { ...parent };
      if (parent.artistsIds) {
        result.artists = await moreRequestsById(parent.artistsIds, artistsUrl);
      }
      return result.artists;
    },
    bands: async (parent) => {
      const result = { ...parent };
      if (parent.bandsIds) {
        result.bands = await moreRequestsById(parent.bandsIds, bandsUrl);
      }
      return result.bands;
    },
    genres: async (parent) => {
      const result = { ...parent };
      if (parent.genresIds) {
        result.genres = await moreRequestsById(parent.genresIds, genresUrl);
      }
      return result.genres;
    },
  },
  Mutation: {
    createTrack: async (_, { content }: ITrackDataPost, context: IConfig) => {
      try {
        const dataReq = transformRequestData(content);
        const { data } = await axios.post(tracksUrl, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    updateTrack: async (_, { id, ...body }: ITrackDataPut, context: IConfig) => {
      try {
        const dataReq = transformRequestData(body.content);
        const { data } = await axios.put(`${tracksUrl}/${id}`, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    deleteTrack: async (_, { id }: IID, context: IConfig) => {
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
