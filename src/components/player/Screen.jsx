import { useEffect, useRef, useState } from 'react';
import { YTstates } from '../../constants.js';

function Screen({
    thumbnail,
    isYtApiLoaded,
    playerElementID,
    playerState,
    showVideoToggle,
    setShowVideoToggle,
}) {
    const [showVideo, setShowVideo] = useState(true);
    const thumbnailContainerRef = useRef(null);
    const thumbnailImgRef = useRef(null);

    useEffect(() => {
        if (!showVideoToggle) {
            setShowVideo(false);
        } else {
            if (
                playerState === YTstates.BUFFERING ||
                playerState === YTstates.PLAYING ||
                playerState === YTstates.NULL
            ) {
                setShowVideo(true);
            } else {
                setShowVideo(false);
            }
        }
    }, [playerState, showVideoToggle]);

    useEffect(() => {
        thumbnailContainerRef.current.classList.remove('animate-blink-once');
        void thumbnailContainerRef.current.offsetWidth;
        thumbnailContainerRef.current.classList.add('animate-blink-once');

        if (showVideo) thumbnailImgRef.current.style.opacity = 0;
        else thumbnailImgRef.current.style.opacity = 1;
    }, [showVideo]);

    return (
        <div
            className='w-full h-full flex justify-center relative overflow-hidden bg-slate-700 rounded-2xl thumbnail-shadow'
            ref={thumbnailContainerRef}
            onClick={() => setShowVideoToggle(!showVideoToggle)}
        >
            <div className='w-full h-full absolute inset-0'>
                <img
                    src={thumbnail}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`w-full h-full object-cover`}
                    ref={thumbnailImgRef}
                />
            </div>

            <div className='h-full aspect-video'>
                <div
                    className='w-full h-full pointer-events-none'
                    id={playerElementID}
                >
                    {!isYtApiLoaded ? (
                        <div className='w-full h-full flex justify-center items-center'>
                            <p className='w-44 font-bold'>
                                YouTube iframe api is not loaded yet. Please
                                refresh the page if it takes more time.
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default Screen;
