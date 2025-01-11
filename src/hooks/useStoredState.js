import { useCallback, useEffect, useRef, useState } from 'react';

function useStoredState(initialValue, key) {
    let storedItemStr = localStorage.getItem(key);
    let storedItem = null;
    try {
        storedItem = JSON.parse(storedItemStr);
    } catch (error) {}

    const [value, setValue] = useState(storedItem ? storedItem : initialValue);

    const setValueAndStore = useCallback(
        (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        },
        [setValue]
    );

    return [value, setValueAndStore];
}

function useStoredStateEncoded(initialValue, key, encoder, fetcher) {
    const [value, setValue] = useState(initialValue);
    const timeoutIdRef = useRef(null);

    const setValueAndStore = useCallback(
        (newValue) => {
            const encodedValue = encoder(newValue);
            setValue(newValue);

            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = setTimeout(() => {
                localStorage.setItem(key, JSON.stringify(encodedValue));
            }, 1000);
        },
        [setValue]
    );

    useEffect(() => {
        let storedItemStr = localStorage.getItem(key);
        let storedItem = null;
        try {
            storedItem = JSON.parse(storedItemStr);
        } catch (error) {}

        if (!storedItem) {
            return;
        }

        fetcher(storedItem).then((result) => {
            setValueAndStore(result);
        });
    }, []);

    return [value, setValueAndStore];
}

export { useStoredState, useStoredStateEncoded };
