import { useState, useEffect, useRef, useCallback } from 'react';

import { YTstates, localStorageKeys, loopingOptions } from '../constants.js';
import { useStoredState } from './useStoredState.js';

import { getMusicDetails } from '../dataManager/index.js';

function useYT(playerElementID) {
    const isYtApiLoaded = useYtApiLoadedStatus();
    const [playerState, setPlayerState] = useState(YTstates.NULL);
    const [playingMusic, setPlayingMusic] = useStoredState(
        {},
        localStorageKeys.playingMusic
    );
    const [looping, setLooping] = useStoredState(
        loopingOptions.LOOP,
        localStorageKeys.looping
    );
    const [queue, setQueue] = useStoredState([], localStorageKeys.queue);
    const playerRef = useRef({});

    const [refreshVar, setRefreshVar] = useState(false);

    const playMusic = useCallback(
        (item) => {
            setPlayingMusic(item);
            setQueue([item]);
        },
        [setPlayingMusic, setQueue]
    );

    const loadPlaylist = useCallback(
        async (playlistItems) => {
            if (!playlistItems?.length) return;

            const playlistItemsDetails = await getMusicDetails(playlistItems);

            setPlayingMusic(playlistItemsDetails[0]);
            setQueue(playlistItemsDetails);
        },
        [setPlayingMusic, setQueue]
    );

    const playFromQueueAt = useCallback(
        async (index) => {
            const item = queue[index];
            if (!item) return;

            setPlayingMusic(item);
        },
        [queue, setPlayingMusic]
    );

    const playPreviousMusic = useCallback(() => {
        const currentQueueIndex = queue.findIndex(
            (item) => item.id === playingMusic.id
        );
        if (currentQueueIndex > 0) {
            playFromQueueAt(currentQueueIndex - 1);
        }
    }, [queue, playingMusic, playFromQueueAt]);

    const playNextMusic = useCallback(() => {
        if (!queue.length) return;
        const currentQueueIndex = queue.findIndex(
            (item) => item.id === playingMusic.id
        );

        if (currentQueueIndex < queue.length - 1) {
            playFromQueueAt(currentQueueIndex + 1);
        } else if (currentQueueIndex === queue.length - 1) {
            if (looping === loopingOptions.LOOP) {
                playFromQueueAt(0);
            }
        }
    }, [queue, playingMusic, playFromQueueAt, looping]);

    const addToQueue = useCallback(
        async (id) => {
            const index = queue.findIndex((item) => item.id === id);
            if (index === -1) {
                const item = (await getMusicDetails([id], false))[0];
                setQueue([...queue, item]);
            } else {
                setQueue([
                    ...queue.filter((item) => item.id !== id),
                    queue[index],
                ]);
            }
        },
        [queue, setQueue]
    );

    const removeFromQueue = useCallback(
        async (id) => {
            if (id === playingMusic.id) return;

            setQueue(queue.filter((item) => item.id !== id));
        },
        [queue, setQueue, playingMusic]
    );

    const nextLoopingOption = useCallback(() => {
        if (looping === loopingOptions.LOOP)
            setLooping(loopingOptions.LOOP_ONCE);
        else if (looping === loopingOptions.LOOP_ONCE)
            setLooping(loopingOptions.SHUFFLE);
        else if (looping === loopingOptions.SHUFFLE)
            setLooping(loopingOptions.LOOP);
    }, [looping, setLooping]);

    const moveQueueItem = useCallback(
        (from, to) => {
            const newQueue = Array.from(queue);
            const [item] = newQueue.splice(from, 1);
            newQueue.splice(to, 0, item);

            setQueue(newQueue);
        },
        [queue, setQueue]
    );

    const refreshPlayer = useCallback(() => {
        setRefreshVar(!refreshVar);
    }, [setRefreshVar, refreshVar]);

    useEffect(() => {
        if (playerState === YTstates.ENDED) {
            if (looping === loopingOptions.LOOP_ONCE) {
                playerRef.current.seekTo(0, true);
                playerRef.current.playVideo();
            } else if (looping === loopingOptions.LOOP) {
                playNextMusic();
            } else if (looping === loopingOptions.SHUFFLE) {
                playFromQueueAt(Math.floor(queue.length * Math.random()));
            }
        }
    }, [playerState]);

    useEffect(() => {
        if (!isYtApiLoaded) return;

        let startTime = localStorage.getItem(localStorageKeys.currentTime);

        if (!startTime || startTime.length < 11) {
            startTime = 0;
        } else {
            let storedId = startTime.substring(0, 11);
            startTime = parseInt(startTime.substring(11));
            if (isNaN(startTime) || storedId !== playingMusic.id) {
                startTime = 0;
            }
        }

        playerRef.current = new window.YT.Player(playerElementID, {
            videoId: playingMusic.id,

            playerVars: {
                start: startTime,
                color: 'white',
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                rel: 0,
            },
        });

        playerRef.current.addEventListener('onReady', () => {
            if (playerRef?.current?.playVideo) playerRef.current.playVideo();
        });
        playerRef.current.addEventListener('onStateChange', () => {
            const currentState = playerRef?.current?.getPlayerState
                ? playerRef.current.getPlayerState()
                : YTstates.NULL;
            setPlayerState(currentState);
        });

        playerRef.current.playpause = () => {
            const state = playerRef?.current?.getPlayerState();
            if (state === YTstates.PLAYING || state === YTstates.BUFFERING) {
                playerRef.current.pauseVideo();
            } else if (
                state === YTstates.PAUSED ||
                state === YTstates.UNSTARTED ||
                state === YTstates.CUED
            ) {
                playerRef.current.playVideo();
            } else if (state === YTstates.ENDED) {
                playerRef.current.seekTo(0, true);
                playerRef.current.playVideo();
            }
        };

        if (
            !queue.length ||
            queue.findIndex((item) => item.id === playingMusic.id) === -1
        )
            setQueue([playingMusic, ...queue]);

        return () => {
            if (playerRef?.current?.destroy) playerRef.current.destroy();
        };
    }, [isYtApiLoaded, playerElementID, playingMusic, refreshVar]);

    const playManager = {
        playMusic,
        playFromQueueAt,
        playPreviousMusic,
        playNextMusic,
        addToQueue,
        removeFromQueue,
        loadPlaylist,
    };

    return {
        isYtApiLoaded,
        playerState,
        playerRef,
        playingMusic,
        playManager,
        queue,
        looping,
        nextLoopingOption,
        moveQueueItem,
        refreshPlayer,
    };
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
        };
    }, []);

    return isYtApiLoaded;
}

export { useYT };
