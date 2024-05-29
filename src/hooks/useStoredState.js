import { useCallback, useState } from "react";

function useStoredStringState(initialValue, key) {
    let storedValue = localStorage.getItem(key);
    const [value, setValue] = useState(storedValue ? storedValue : initialValue);

    const setValueAndStore = useCallback((newValue) => {
        localStorage.setItem(key, newValue);
        setValue(newValue);
    }, [setValue]);

    return [value, setValueAndStore];
}

function useStoredNumberState(initialValue, key) {
    let storedValue = localStorage.getItem(key);
    storedValue = Number(storedValue);
    if (isNaN(storedValue))
        storedValue = undefined;
    
    const [value, setValue] = useState(storedValue ? storedValue : initialValue);

    const setValueAndStore = useCallback((newValue) => {
        localStorage.setItem(key, newValue);
        setValue(newValue);
    }, [setValue]);

    return [value, setValueAndStore];
}
function useStoredBooleanState(initialValue, key) {
    let storedValue = localStorage.getItem(key);
    if (storedValue === 'true') 
        storedValue = true;
    else if (storedValue === 'false')
        storedValue = false;
    else {
        if (initialValue) {
            storedValue = initialValue;
        }
        else {
            storedValue = false;
        }
    }

    const [value, setValue] = useState(storedValue);

    const setValueAndStore = useCallback((newValue) => {
        if (newValue)
            newValue = true;
        else
            newValue = false;
        localStorage.setItem(key, newValue);
        setValue(newValue);
    }, [setValue]);

    return [value, setValueAndStore];
}

export { useStoredStringState, useStoredNumberState, useStoredStringState };