import { useState, useEffect, useRef, useCallback } from "react";

import { YTstates, localStorageKeys } from "../constants.js";
import { useStoredState } from './useStoredState.js';

function useYT(playerElementID) {
    const isYtApiLoaded = useYtApiLoadedStatus();
    const [playerState, setPlayerState] = useState(YTstates.NULL);
    const [playingMusic, setPlayingMusic] = useStoredState({}, localStorageKeys.playingMusic);
    const playerRef = useRef({});

    const playMusic = (item) => {
        setPlayingMusic(item);
    }

    useEffect(() => {
        return () => {
            playerRef.current.previousState = playerState;
        }
    }, [playerState]);
    
    useEffect(() => {
        if (!isYtApiLoaded) return;

        let startTime = localStorage.getItem(localStorageKeys.currentTime);
        
        if (!startTime || startTime.length < 11) {
            startTime = 0;
        }
        else {
            let storedId = startTime.substring(0, 11);
            startTime = parseInt(startTime.substring(11));
            if (isNaN(startTime) || storedId !== playingMusic.id) {
                startTime = 0;
            }
        }
        
        playerRef.current = new window.YT.Player(playerElementID, {
            videoId: playingMusic.id,
            
            playerVars: {
                'start': startTime,
                'color': 'white',
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'iv_load_policy': 3,
                'rel': 0
            }
        });

        playerRef.current.previousState = YTstates.NULL;
        playerRef.current.addEventListener('onReady', () => {
            if (playerRef?.current?.playVideo)
                playerRef.current.playVideo();
        });
        playerRef.current.addEventListener('onStateChange', () => {
            const currentState = playerRef?.current?.getPlayerState ? playerRef.current.getPlayerState() : YTstates.NULL;
            setPlayerState(currentState);
        });

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

    }, [isYtApiLoaded, playerElementID, playingMusic]);

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