import {useEffect, useState} from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: `http://localhost:8081/api/`
});


export function useApi(initialUrl, initialData = undefined, body = undefined) {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        async function fetchData() {
            const result = body ? await client.post(url, body) : await client.get(url);
            setData(result.data);
        }

        fetchData();
    }, [url, body]);

    return [data, setUrl];
}

export default client;
