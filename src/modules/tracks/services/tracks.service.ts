import axios from 'axios';
import { IConfig } from '../../../utils/types';
import { ITrackDataPost, ITrackDataPut } from '../models/tracks.model';
import {
  albumsUrl, artistsUrl, bandsUrl, genresUrl, tracksUrl,
} from '../../../utils/constants';
import {
  transformRequestData, transformResponseData, errorHandler, moreRequestsById, requestsById,
} from '../../../utils/common';

export class TracksService {
  async tracks(limit = 5, offset = 0, filter = '') {
    const { data } = await axios.get(tracksUrl, { params: { limit, offset, filter } });
    const newData = transformResponseData(data);
    return newData;
  }

  async track(id: string) {
    const { data } = await axios.get(`${tracksUrl}/${id}`);
    const newData = transformResponseData(data);
    return newData;
  }

  async album(parent) {
    const result = { ...parent };
    if (parent.albumId) {
      result.album = await requestsById(parent.albumId, albumsUrl);
    }
    return result.album;
  }

  async artists(parent) {
    const result = { ...parent };
    if (parent.artistsIds) {
      result.artists = await moreRequestsById(parent.artistsIds, artistsUrl);
    }
    return result.artists;
  }

  async bands(parent) {
    const result = { ...parent };
    if (parent.bandsIds) {
      result.bands = await moreRequestsById(parent.bandsIds, bandsUrl);
    }
    return result.bands;
  }

  async genres(parent) {
    const result = { ...parent };
    if (parent.genresIds) {
      result.genres = await moreRequestsById(parent.genresIds, genresUrl);
    }
    return result.genres;
  }

  async createTrack({ content }: ITrackDataPost, context: IConfig) {
    try {
      const dataReq = transformRequestData(content);
      const { data } = await axios.post(tracksUrl, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async updateTrack({ id, ...body }: ITrackDataPut, context: IConfig) {
    try {
      const dataReq = transformRequestData(body.content);
      const { data } = await axios.put(`${tracksUrl}/${id}`, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async deleteTrack(id: string, context: IConfig) {
    try {
      const { data } = await axios.delete(`${tracksUrl}/${id}`, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }
}
