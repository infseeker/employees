import axios from 'axios';
import { User } from '../models/User';

const apiUrl: string = process.env.REACT_APP_API_URL!;

export default abstract class UserService {
  static async getUsersByFilter(filter: string): Promise<any> {
    const url = `${apiUrl}?__example=${filter}`;
    return axios
      .get(url)
      .then((r) => r.data)
      .then((data) => data.items as User[])
      .catch((e) => {
        throw e
      });
      
  }

  static async getDynamicUsers(): Promise<any> {
    const url = `${apiUrl}?__dynamic=true`;
    return axios
      .get(url)
      .then((r) => r.data)
      .then((data) => data.items as User[])
      .catch((e) => {
        throw e
      });
  }

  static async get500(): Promise<any> {
    const url = `${apiUrl}?__code=500`;
    return axios
      .get(url).then(r => r.status).catch((e) => {
        throw e
      });
  }
}
