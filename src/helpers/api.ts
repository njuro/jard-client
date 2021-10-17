import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { notifyError } from "./notifications";

export const SERVER_API_URL =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8081/api`;
const client = axios.create({
  baseURL: SERVER_API_URL,
  withCredentials: true,
});

// eslint-disable-next-line
export const apiErrorHandler = (error: AxiosError<any>) => {
  function getErrorDescription() {
    if (!error.response) {
      return "Server is not responding";
    }

    return `Got error code from server [${error.response.status}]`;
  }

  if (!error.response?.data?.errors) {
    notifyError("Server error", getErrorDescription());
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

export function patchApiRequest<T>(
  url: string,
  body = {},
  config?: AxiosRequestConfig
) {
  return makeRequest<T>("PATCH", url, body, config);
}

export function deleteApiRequest<T>(
  url: string,
  body = {},
  config?: AxiosRequestConfig
) {
  return makeRequest<T>("DELETE", url, body, config);
}

function makeRequest<T>(
  method: Method,
  url: string,
  body = {},
  config?: AxiosRequestConfig
) {
  return client
    .request<unknown, AxiosResponse<T>>({
      method,
      url,
      data: body,
      ...config,
    })
    .then((res) => res.data);
}
export default client;
