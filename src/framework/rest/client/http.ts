import axios from 'axios';
import Cookies from 'js-cookie';
import { useToken } from 'src/lib/hooks/use-token';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 3000,
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = useToken().getToken();
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

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await http.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await http.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await http.put<T>(url, data);
    return response.data;
  }
  static async patch<T>(url: string, data: unknown) {
    const response = await http.patch<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await http.delete<T>(url);
    return response.data;
  }
}
