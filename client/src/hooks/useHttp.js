import {useCallback, useState} from "react";

export const useHttp = () => {
    const [error, setError] = useState(null);

    const request = useCallback(async (url, options) => {
        try {
            const response = await fetch(url, options);
            return await response.json()
        } catch (e) {
            setError(e.message);
            throw e
        }
    }, []);
    return {request, error}
};