import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorageItem } from '@/utils/local-storage/local-storage.utils';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3030',
};

export const almofusAxios = axios.create(axiosConfig);

almofusAxios.interceptors.request.use((config) => {
  config.headers['almofus-access-token'] = getLocalStorageItem('accessToken');
  return config;
});
