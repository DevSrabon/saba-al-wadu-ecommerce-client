import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

// Utility to get the token
const getToken = () => {
  return Cookies.get('auth_token') || ''; // Fetch token from cookies or return an empty string
};

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 3000,
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    const token = getToken(); // Use the token utility
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error({ error });

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
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
