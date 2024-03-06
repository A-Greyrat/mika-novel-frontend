import axios from 'axios';
export default axios.create({
  baseURL: 'https://118.31.42.183/api',
  timeout: 5000,
});

export interface ResponseData {
  code: number;
  data: unknown;
  message: string;
}