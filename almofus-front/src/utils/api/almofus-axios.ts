import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3030',
};

export const almofusAxios = axios.create(axiosConfig);
