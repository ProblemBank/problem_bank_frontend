import Axios from 'axios';
import { baseURL } from '../Constants'

const baseAxios = Axios.create({
  baseURL: baseURL + '/api/',
  timeout: 20000,
  maxRedirects: 5,
});

export const updateToken = ({ token }) => {
  if (token) {
    baseAxios.defaults.headers.common['Authorization'] = 'JWT ' + token;
  } else {
    baseAxios.defaults.headers.common['Authorization'] = null;
    delete baseAxios.defaults.headers.common['Authorization'];
  }
};

export default baseAxios;
