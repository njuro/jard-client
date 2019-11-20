import {useEffect, useState} from 'react';

function useUpdater() {
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(false);
    }, [flag]);

    return () => setFlag(true);
}

export default useUpdater;