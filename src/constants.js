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
    playVideoToggle: 'xMuzikk_playVideo_Toggle'
});

export { YTstates, localStorageKeys };