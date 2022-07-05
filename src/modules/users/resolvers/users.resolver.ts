import axios from 'axios';
import { IIDDefault, INewUser, IUserLogin } from '../../../utils/types';
import { usersUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    user: async (_: any, { id }: IIDDefault) => {
      const { data } = await axios.get(`${usersUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
    jwt: async (_: any, body: IUserLogin) => {
      try {
        const { data } = await axios.post(`${usersUrl}/login`, body);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
  Mutation: {
    register: async (_: any, { content }: INewUser) => {
      try {
        const { data } = await axios.post(`${usersUrl}/register`, content);
        const newData = transformResponseData(data);
        return newData;
      } catch (error: any) {
        throw errorHandler(error);
      }
    },
  },
};
