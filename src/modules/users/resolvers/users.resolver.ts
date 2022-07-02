import axios from 'axios';
import { IID, INewUser, IUserLogin } from '../../../utils/types';
import { usersUrl } from '../../../utils/constants';

export const resolver = {
  Query: {
    user: async (_: any, { _id }: IID) => {
      const { data } = await axios.get(`${usersUrl}/${_id}`);
      return data;
    },
    login: async (_: any, body: IUserLogin) => {
      try {
        const { data } = await axios.post(`${usersUrl}/login`, body);
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    register: async (_: any, { content }: INewUser) => {
      try {
        const { data } = await axios.post(`${usersUrl}/register`, content);
        return data;
      } catch (error: any) {
        return error;
      }
    },
  },
};
