import axios from 'axios';
import { IConfig } from '../../../utils/types';
import { IAlbumDataPost, IAlbumDataPut } from '../models/albums.model';
import {
  albumsUrl, artistsUrl, bandsUrl, genresUrl, tracksUrl,
} from '../../../utils/constants';
import {
  transformResponseData, errorHandler, moreRequestsById, transformRequestData,
} from '../../../utils/common';

export class AlbumsService {
  async albums(limit = 5, offset = 0, filter = '') {
    const { data } = await axios.get(albumsUrl, { params: { limit, offset, filter } });
    const newData = transformResponseData(data);
    return newData;
  }

  async album(id: string) {
    const { data } = await axios.get(`${albumsUrl}/${id}`);
    const newData = transformResponseData(data);
    return newData;
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

  async tracks(parent) {
    const result = { ...parent };
    if (parent.trackIds) {
      result.tracks = await moreRequestsById(parent.trackIds, tracksUrl);
    }
    return result.tracks;
  }

  async genres(parent) {
    const result = { ...parent };
    if (parent.genresIds) {
      result.genres = await moreRequestsById(parent.genresIds, genresUrl);
    }
    return result.genres;
  }

  async createAlbum({ content }: IAlbumDataPost, context: IConfig) {
    try {
      const dataReq = transformRequestData(content);
      const { data } = await axios.post(albumsUrl, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async updateAlbum({ id, ...body }: IAlbumDataPut, context: IConfig) {
    try {
      const dataReq = transformRequestData(body.content);
      const { data } = await axios.put(`${albumsUrl}/${id}`, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async deleteAlbum(id: string, context: IConfig) {
    try {
      const { data } = await axios.delete(`${albumsUrl}/${id}`, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }
}
