import { useState, useEffect, useRef, useCallback } from "react";

import { YTstates } from "../constants.js";

function useYT(playerElementID) {
    const isYtApiLoaded = useYtApiLoadedStatus();
    const [playerState, setPlayerState] = useState(YTstates.NULL);
    const [playingMusic, setPlayingMusic] = useState({});
    const playerRef = useRef({});

    const handleStateChange = useCallback(() => {
        const currentState = playerRef?.current?.getPlayerState ? playerRef.current.getPlayerState() : YTstates.NULL;
        setPlayerState(currentState);
    }, [setPlayerState, playerRef]);

    const playMusic = (item) => {
        setPlayingMusic(item);
        playerRef.current.loadVideoById(item.id);
    }

    useEffect(() => {
        return () => {
            playerRef.current.previousState = playerState;
        }
    }, [playerState]);
    
    useEffect(() => {
        if (!isYtApiLoaded) return;
        
        playerRef.current = new window.YT.Player(playerElementID, {
            videoId: "",
            
            playerVars: {
                'start': 0,
                'color': 'white',
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'iv_load_policy': 3,
                'rel': 0
            }
        });

        playerRef.current.previousState = YTstates.NULL;
        playerRef.current.addEventListener('onStateChange', handleStateChange);

        playerRef.current.playpause = () => {
            const state = playerRef?.current?.getPlayerState();
            if (state === YTstates.PLAYING || state === YTstates.BUFFERING) {
                playerRef.current.pauseVideo();
            }
            else if (state === YTstates.PAUSED || state === YTstates.UNSTARTED || state === YTstates.CUED) {
                playerRef.current.playVideo();
            }
            else if (state === YTstates.ENDED) {
                playerRef.current.seekTo(0, true);
                playerRef.current.playVideo();
            }
        }
        
        return () => {
            if (playerRef?.current?.destroy) 
                playerRef.current.destroy();
        }

    }, [isYtApiLoaded, playerElementID]);

    return {isYtApiLoaded, playerState, playerRef, playingMusic, playMusic};
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