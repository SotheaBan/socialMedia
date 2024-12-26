// src/utils/axiosConfig.js
import axios from 'axios';
import { getAccessToken } from './authHelper';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

axiosInstance.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export default axiosInstance;