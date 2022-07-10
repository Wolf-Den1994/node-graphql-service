import axios from 'axios';
import { IID } from '../../../utils/types';
import { INewUser, IUserLogin } from '../models/users.model';
import { usersUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export const resolver = {
  Query: {
    user: async (_, { id }: IID) => {
      const { data } = await axios.get(`${usersUrl}/${id}`);
      const newData = transformResponseData(data);
      return newData;
    },
    jwt: async (_, body: IUserLogin) => {
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
    register: async (_, { content }: INewUser) => {
      try {
        const { data } = await axios.post(`${usersUrl}/register`, content);
        const newData = transformResponseData(data);
        return newData;
      } catch (error) {
        throw errorHandler(error);
      }
    },
  },
};
