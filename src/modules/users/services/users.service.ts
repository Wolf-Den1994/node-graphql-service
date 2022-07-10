import axios from 'axios';
import { IRegistrationData, IUserLogin } from '../models/users.model';
import { usersUrl } from '../../../utils/constants';
import { transformResponseData, errorHandler } from '../../../utils/common';

export class UsersService {
  async user(id: string) {
    const { data } = await axios.get(`${usersUrl}/${id}`);
    const newData = transformResponseData(data);
    return newData;
  }

  async jwt(body: IUserLogin) {
    try {
      const { data } = await axios.post(`${usersUrl}/login`, body);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async register(content: IRegistrationData) {
    try {
      const { data } = await axios.post(`${usersUrl}/register`, content);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }
}
