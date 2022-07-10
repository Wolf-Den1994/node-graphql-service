import axios from 'axios';
import { IID, IConfig } from '../../../utils/types';
import { IAlbumDataPost, IAlbumDataPut } from '../models/albums.model';
import {
  albumsUrl, artistsUrl, bandsUrl, genresUrl, tracksUrl,
} from '../../../utils/constants';
import {
  transformResponseData, errorHandler, moreRequestsById, transformRequestData,
} from '../../../utils/common';

export const resolver = {
  Query: {
    albums: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const { data } = await axios.get(albumsUrl, { params: { limit, offset, filter } });
      const newData = transformResponseData(data);
      return newData;
    },
    album: async (_, { id }: IID) => {
      const { data } = await axios.get(`${albumsUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
  },
  Album: {
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
    tracks: async (parent) => {
      const result = { ...parent };
      if (parent.trackIds) {
        result.tracks = await moreRequestsById(parent.trackIds, tracksUrl);
      }
      return result.tracks;
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
    createAlbum: async (_, { content }: IAlbumDataPost, context: IConfig) => {
      try {
        const dataReq = transformRequestData(content);
        const { data } = await axios.post(albumsUrl, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    updateAlbum: async (_, { id, ...body }: IAlbumDataPut, context: IConfig) => {
      try {
        const dataReq = transformRequestData(body.content);
        const { data } = await axios.put(`${albumsUrl}/${id}`, dataReq, context.config);
        const dataRes = transformResponseData(data);
        return dataRes;
      } catch (error) {
        throw errorHandler(error);
      }
    },
    deleteAlbum: async (_, { id }: IID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${albumsUrl}/${id}`, context.config);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
};
