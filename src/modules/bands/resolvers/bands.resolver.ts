import axios from 'axios';
import {
  IIDDefault, IBandDataPost, IConfig, IBandDataPut, IDataID,
} from '../../../utils/types';
import { bandsUrl } from '../../../utils/constants';
import { transformData } from '../../../utils/common';

export const resolver = {
  Query: {
    bands: async () => {
      const { data } = await axios.get(bandsUrl);
      const newData = transformData(data);
      return newData;
    },
    band: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${bandsUrl}/${id}`);
      const newData = transformData(data);
      return newData;
    },
  },
  Mutation: {
    createBand: async (_: any, { content }: IBandDataPost, context: IConfig) => {
      try {
        const { data } = await axios.post(bandsUrl, content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error: any) {
        return error;
      }
    },
    updateBand: async (_: any, { id, ...body }: IBandDataPut, context: IConfig) => {
      try {
        const { data } = await axios.put(`${bandsUrl}/${id}`, body.content, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
    deleteBand: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${bandsUrl}/${id}`, context.config);
        const newData = transformData(data);
        return newData;
      } catch (error) {
        return error;
      }
    },
  },
};
