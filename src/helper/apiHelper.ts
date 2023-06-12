import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

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
