import axios from 'axios';
import { IConfig } from '../../../utils/types';
import { IBandDataPut, IBandDataPost } from '../models/bands.model';
import { artistsUrl, bandsUrl, genresUrl } from '../../../utils/constants';
import {
  moreRequestsById, transformRequestData, transformResponseData, errorHandler,
} from '../../../utils/common';

export class BandsService {
  async bands(limit = 5, offset = 0, filter = '') {
    const { data } = await axios.get(bandsUrl, { params: { limit, offset, filter } });
    const newData = transformResponseData(data);
    return newData;
  }

  async band(id: string) {
    const { data } = await axios.get(`${bandsUrl}/${id}`);
    const newData = transformResponseData(data);
    return newData;
  }

  async genres(parent) {
    const result = { ...parent };
    if (parent.genresIds) {
      result.bands = await moreRequestsById(parent.genresIds, genresUrl);
    }
    return result.bands;
  }

  async members(parent) {
    const result = { ...parent };
    if (parent.members) {
      const ids = parent.members.map(({ artist }) => artist);
      result.members = await moreRequestsById(ids, artistsUrl);
      const artistsResult = result.members.map((member) => {
        const artistFind = parent.members.find(({ artist }) => artist === member.id);
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
  }

  async createBand({ content }: IBandDataPost, context: IConfig) {
    try {
      const dataReq = transformRequestData(content);
      const { data } = await axios.post(bandsUrl, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async updateBand({ id, ...body }: IBandDataPut, context: IConfig) {
    try {
      const dataReq = transformRequestData(body.content);
      const { data } = await axios.put(`${bandsUrl}/${id}`, dataReq, context.config);
      const dataRes = transformResponseData(data);
      return dataRes;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async deleteBand(id: string, context: IConfig) {
    try {
      const { data } = await axios.delete(`${bandsUrl}/${id}`, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }
}
