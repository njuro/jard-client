import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { toast } from "react-semantic-toasts";

export const SERVER_API_URL =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8081/api`;
const client = axios.create({
  baseURL: SERVER_API_URL,
  withCredentials: true,
});

export const apiErrorHandler = (error: AxiosError) => {
  function getErrorDescription() {
    if (!error.response) {
      return "Server is not responding";
    }

    return `Got error code from server [${error.response.status}]`;
  }

  if (!error.response?.data?.errors) {
    toast({
      title: "Server error",
      description: getErrorDescription(),
      type: "error",
      time: 5000,
      animation: "fade down",
      size: "small",
      color: "red",
    });
  }
};

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
