import { useState, useEffect, useRef } from "react";

function useYT(playerElementID) {
    const isYtApiLoaded = useYtApiLoadedStatus();
    

    return [isYtApiLoaded];
}

function useYtApiLoadedStatus() {
    const [isYtApiLoaded, setIsYtApiLoaded] = useState(window.isYtApiLoaded);
    const itvIdRef = useRef(-1);

    useEffect(() => {
        if (!isYtApiLoaded) {
            clearInterval(itvIdRef.current);

            itvIdRef.current = setInterval(() => {
                if (window.isYtApiLoaded) {
                    setIsYtApiLoaded(true);
                    clearInterval(itvIdRef.current);
                }
            }, 100);
        }

        return () => {
            clearInterval(itvIdRef.current);
        }
    }, []);

    return isYtApiLoaded;
}

export { useYT };