const YTstates = Object.freeze({
    NULL: -2,
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
});

const localStorageKeys = Object.freeze({
    playVideoToggle: 'xMuzikk_playVideo_Toggle',
    playingMusic: 'xMuzikk_playingMusic',
    currentTime: 'xMuzikk_playback_currentTime',
    looping: 'xMuzikk_looping'
});

const loopingOptions = Object.freeze({
    LOOP: 0,
    LOOP_ONCE: 1,
    SHUFFLE: 2
});

export { YTstates, localStorageKeys, loopingOptions };