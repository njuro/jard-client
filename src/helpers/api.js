import {useEffect, useState} from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: `http://localhost:8081/api/`,
    withCredentials: true
});

export function usePostApi(url) {

    function makeRequest(body = {}) {
        return client.post(url, body).then(res => res.data);
    }

    return makeRequest;
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
