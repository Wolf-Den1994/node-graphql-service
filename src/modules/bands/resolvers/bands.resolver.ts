import axios from 'axios';
import {
  IID, IBandDataPost, IConfig, IBandDataPut, IDataID,
} from '../../../utils/types';
import { bandsUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    bands: async () => {
      const { data } = await axios.get(bandsUrl);
      return data;
    },
    band: async (_: any, { _id }: IID) => {
      const { data } = await axios.get(`${bandsUrl}/${_id}`);
      return data;
    },
  },
  Mutation: {
    createBand: async (_: any, { content }: IBandDataPost, context: IConfig) => {
      try {
        console.log('context', context);
        console.log('body', content);
        const { data } = await axios.post(bandsUrl, content, context.config);
        console.log('data', data);
        return data;
      } catch (error: any) {
        return error;
      }
    },
    updateBand: async (_: any, { id, ...body }: IBandDataPut, context: IConfig) => {
      try {
        console.log('body', body);
        const { data } = await axios.put(`${bandsUrl}/${id}`, body.content, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteBand: async (_: any, { id }: IDataID, context: IConfig) => {
      try {
        const { data } = await axios.delete(`${bandsUrl}/${id}`, context.config);
        console.log('data', data);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};
