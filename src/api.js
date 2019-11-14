import {useEffect, useState} from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: `http://localhost:8081/api/`,
    withCredentials: true
});


export function usePostApi(url, initialData = undefined) {
    const [body, setBody] = useState(undefined);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        async function sendRequest() {
            const result = await client.post(url, body);
            setData(result.data);
        }

        if (body) {
            sendRequest();
        }
    }, [body]);

    return [data, setBody];
}

export function useGetApi(initialUrl, initialData = undefined) {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        async function fetchData() {
            const result = await client.get(url);
            setData(result.data);
        }

        fetchData();
    }, [url]);

    return [data, setUrl];
}

export default client;
