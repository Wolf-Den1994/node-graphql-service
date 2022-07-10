import { IID } from '../../../utils/types';
import { INewUser, IUserLogin } from '../models/users.model';
import { UsersService } from '../services/users.service';

const Users = new UsersService();

export const resolver = {
  Query: {
    user: async (_, { id }: IID) => {
      const data = await Users.user(id);
      return data;
    },
    jwt: async (_, body: IUserLogin) => {
      const data = await Users.jwt(body);
      return data;
    },
  },
  Mutation: {
    register: async (_, { content }: INewUser) => {
      const data = await Users.register(content);
      return data;
    },
  },
};
