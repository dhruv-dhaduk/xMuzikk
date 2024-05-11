import { useState, useEffect, useRef, useId } from "react";

function YouTubePlayer({ exposePlayerRef, handleStateChange }) {
    const [isApiLoaded, setIsApiLoaded] = useState(window.YT.loaded);
    const playerRef = useRef(null);

    const playerElementID = useId();

    useEffect(() => {
        if (window.YT.loaded)
            return;

        const itvID = setInterval(() => {
            if (window.YT.loaded) {
                clearInterval(itvID);
                setIsApiLoaded(true);
            }
        }, 100);

        return () => {
            clearInterval(itvID);
        }
    });

    useEffect(() => {
        if (!isApiLoaded) return;

        const handleReady = () => {
            window.player = playerRef.current;
            playerRef.current.playVideo();

            exposePlayerRef(
                () => {
                return playerRef.current.getPlayerState(); 
            });

            exposePlayerRef({
                getPlayerState: () => playerRef.current.getPlayerState(),
                playVideo: () => playerRef.current.playVideo(),
                pauseVideo: () => playerRef.current.pauseVideo(),
                loadVideoById: (id) => playerRef.current.loadVideoById(id, 0)
            });
        }
        
        playerRef.current = new window.YT.Player(playerElementID, {
            height: '390',
            width: '640',
            videoId: "",

            playerVars: {
                'start': 0,
                'color': 'white',
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'iv_load_policy': 3,
                'rel': 0
            },

            events: {
                'onReady': handleReady,
                'onStateChange': handleStateChange
            }

        });
        
        return () => {
            if (playerRef.current)
                playerRef.current.destroy();
        }
    }, [isApiLoaded, playerElementID]);

    if (!isApiLoaded) {
        return <div>API not Loaded yet.</div>
    }

    return (
        <div className='h-full aspect-video'>
            <div
                id={playerElementID}
                className='w-full h-full pointer-events-none'
            />
        </div>
    );
}

export default YouTubePlayer;