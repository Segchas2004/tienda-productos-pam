import axios from 'axios';

export const productApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
});
