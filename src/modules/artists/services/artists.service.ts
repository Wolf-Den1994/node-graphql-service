import axios from 'axios';
import { IConfig } from '../../../utils/types';
import { IArtistDataPut, IArtistDataPost } from '../models/artists.model';
import { artistsUrl, bandsUrl } from '../../../utils/constants';
import {
  transformRequestData, transformResponseData, errorHandler, moreRequestsById,
} from '../../../utils/common';

export class ArtistsService {
  async artists(limit = 5, offset = 0, filter = '') {
    const { data } = await axios.get(artistsUrl, { params: { limit, offset, filter } });
    const newData = transformResponseData(data);
    return newData;
  }

  async artist(id: string) {
    const { data } = await axios.get(`${artistsUrl}/${id}`);
    const newData = transformResponseData(data);
    return newData;
  }

  async bands(parent) {
    const result = { ...parent };
    if (parent.bandsIds) {
      result.bands = await moreRequestsById(parent.bandsIds, bandsUrl);
    }
    return result.bands;
  }

  async createArtist({ content }: IArtistDataPost, context: IConfig) {
    try {
      const dataReq = transformRequestData(content);
      const { data } = await axios.post(artistsUrl, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async updateArtist({ id, ...body }: IArtistDataPut, context: IConfig) {
    try {
      const dataReq = transformRequestData(body.content);
      const { data } = await axios.put(`${artistsUrl}/${id}`, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async deleteArtist(id: string, context: IConfig) {
    try {
      const { data } = await axios.delete(`${artistsUrl}/${id}`, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }
}
