import axios from 'axios';

const client = axios.create({
    baseURL: `http://localhost:8081/api/`,
    withCredentials: true
});

export function postApiRequest(url, body = {}) {
    return client.post(url, body).then(res => res.data);
}

export function getApiRequest(url) {
    return client.get(url).then(res => res.data);
}

export default client;
