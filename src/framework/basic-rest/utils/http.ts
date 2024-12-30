import { getToken } from '@rest/client/get-token';
import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT_LOCAL,
  timeout: 3000,
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    // config.headers.Authorization = {
    //   ...config.headers,
    //   Authorization: `Bearer ${token ? token : ''}`,
    // };
    config.headers.Authorization = `Bearer ${token ? token : ''}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export default http;
// Change response data/error here
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ error });
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'Unauthorized request!')
    ) {
      Cookies.remove('auth_token');
    
    }
    return Promise.reject(error);
  }
);
