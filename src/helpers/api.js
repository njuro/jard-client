import axios from "axios";

const client = axios.create({
  baseURL: `http://localhost:8081/api/`,
  withCredentials: true
});

export function getApiRequest(url) {
  return makeRequest("GET", url);
}

export function postApiRequest(url, body = {}) {
  return makeRequest("POST", url, body);
}

export function putApiRequest(url, body = {}) {
  return makeRequest("PUT", url, body);
}

export function deleteApiRequest(url) {
  return makeRequest("DELETE", url);
}

function makeRequest(method, url, body = {}) {
  return client
    .request({
      method: method,
      url: url,
      data: body
    })
    .then(res => res.data);
}
export default client;
