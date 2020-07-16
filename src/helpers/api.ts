import axios, { AxiosRequestConfig, Method } from "axios";

export const SERVER_API_URL =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8081/api`;
const client = axios.create({
  baseURL: SERVER_API_URL,
  withCredentials: true,
});

export function getApiRequest<T>(url: string, config?: AxiosRequestConfig) {
  return makeRequest<T>("GET", url, config);
}

export function postApiRequest<T>(
  url: string,
  body = {},
  config?: AxiosRequestConfig
) {
  return makeRequest<T>("POST", url, body, config);
}

export function putApiRequest<T>(
  url: string,
  body = {},
  config?: AxiosRequestConfig
) {
  return makeRequest<T>("PUT", url, body, config);
}

export function deleteApiRequest<T>(url: string, config?: AxiosRequestConfig) {
  return makeRequest<T>("DELETE", url, config);
}

function makeRequest<T>(
  method: Method,
  url: string,
  body = {},
  config?: AxiosRequestConfig
) {
  return client
    .request({
      method,
      url,
      data: body,
      ...config,
    })
    .then<T>((res) => res.data);
}
export default client;
