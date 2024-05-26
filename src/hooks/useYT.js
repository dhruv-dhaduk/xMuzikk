import { useState, useEffect, useRef } from "react";

function useYT(playerElementID) {
    const isYtApiLoaded = useYtApiLoadedStatus();

    const playerRef = useRef({});
    
    useEffect(() => {
        if (!isYtApiLoaded) return;
        
        playerRef.current = new window.YT.Player(playerElementID, {
            videoId: "",
            
            playerVars: {
                'start': 0,
                'color': 'red',
            },
            
            events: {
                'onReady': () => { playerRef.current.playVideo(); }
            }
        });
        
        console.log(playerRef);
        return () => {
            if (playerRef?.current?.destroy) 
                playerRef.current.destroy();
        }

    }, [isYtApiLoaded, playerElementID]);

    return [isYtApiLoaded, playerRef];
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