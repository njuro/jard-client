import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const client = axios.create({
    baseURL: `http://localhost:8081/api/`
});


export function usePostApi(initialData = undefined, body = undefined) {
    return useApi(undefined, initialData, body);
}

export function useApi(initialUrl, initialData = undefined, body = undefined) {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        async function fetchData() {
            const result = body ? await client.post(url, body, {
                withCredentials: true,
                headers: {
                    'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
                }
            }) : await client.get(url);
            setData(result.data);
        }

        if (url) {
            fetchData();
        }
    }, [url, body]);

    return [data, setUrl];
}

export default client;
