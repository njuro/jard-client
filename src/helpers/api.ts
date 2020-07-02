import axios, { Method } from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `http://localhost:8081/api/`,
  withCredentials: true,
});

export function getApiRequest<T>(url: string) {
  return makeRequest<T>("GET", url);
}

export function postApiRequest<T>(url: string, body = {}) {
  return makeRequest<T>("POST", url, body);
}

export function putApiRequest<T>(url: string, body = {}) {
  return makeRequest<T>("PUT", url, body);
}

export function deleteApiRequest<T>(url: string) {
  return makeRequest<T>("DELETE", url);
}

function makeRequest<T>(method: Method, url: string, body = {}) {
  return client
    .request({
      method,
      url,
      data: body,
    })
    .then<T>((res) => res.data);
}
export default client;
