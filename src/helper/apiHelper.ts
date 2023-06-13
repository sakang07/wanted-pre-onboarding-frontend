import axios, { InternalAxiosRequestConfig } from 'axios';
import { SIGNIN_TOKEN, URL } from '@/constant';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

// 토큰 정보 요청 header에 삽입
const addAuthToHeaders = (config: InternalAxiosRequestConfig) => {
  const token = window.localStorage.getItem(SIGNIN_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 요청 인터셉터
instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  return addAuthToHeaders(config);
});

// 응답 인터셉터
instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { response: errorResponse } = error;
    if (errorResponse?.status === 401) {
      // accessToken 만료시
      window.localStorage.removeItem(SIGNIN_TOKEN);
      window.location.href = process.env.REACT_APP_PUBLIC_URL + URL.SIGNIN;
    }
    error.message =
      (errorResponse && errorResponse?.data && errorResponse?.data?.message) || error?.message || error.toString();
    return Promise.reject(error);
  },
);

export async function get(url: string, data?: object, config = {}) {
  return instance.get(url, { params: { ...data }, ...config });
}

export async function post(url: string, data?: object, config = {}) {
  return instance.post(url, { ...data }, { ...config });
}

export async function put(url: string, data?: object, config = {}) {
  return instance.put(url, { ...data }, { ...config });
}

export async function del(url: string, config = {}) {
  return instance.delete(url, { ...config });
}

export async function patch(url: string, data?: object, config = {}) {
  return instance.patch(url, { ...data }, { ...config });
}

export default instance;
