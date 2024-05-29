import { useEffect, useRef } from "react";
import { useState } from "react";
import { YTstates } from "../../constants.js";

function Screen({ thumbnail, playerElementID, isYtApiLoaded, playerState, showVideoToggle }) {
    const [showVideo, setShowVideo] = useState(true);
    const thumbnailContainerRef = useRef(null);
    const thumbnailImgRef = useRef(null);

    useEffect(() => {
        if (!showVideoToggle) {
            setShowVideo(false);
        }
        else {
            if (playerState === YTstates.BUFFERING || playerState === YTstates.PLAYING || playerState === YTstates.NULL) {
                setShowVideo(true);
            }
            else {
                setShowVideo(false);
            }
        }
    }, [playerState, showVideoToggle]);

    useEffect(() => {
        thumbnailContainerRef.current.classList.remove("animate-blink-once");
        setTimeout(() => {
            thumbnailContainerRef.current.classList.add("animate-blink-once");
            if (showVideo)
                thumbnailImgRef.current.style.opacity = 0;
            else
                thumbnailImgRef.current.style.opacity = 1;
        }, 10);
    }, [showVideo]);
    
    return (
        <div className='flex-none tablet:flex-initial aspect-square bg-black rounded-2xl'>
            <div 
                className='w-full h-full flex justify-center relative overflow-hidden bg-slate-700 rounded-2xl'
                ref={thumbnailContainerRef}
            >
                <div className='w-full h-full absolute inset-0'>
                    <img 
                        src={thumbnail}
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                        className={`w-full h-full object-cover`}
                        ref={thumbnailImgRef}
                    />
                </div>

                <div className='h-full aspect-video'>
                    <div
                        id={playerElementID}
                        className='w-full h-full pointer-events-none'
                    >
                        { !isYtApiLoaded ? "YouTube iframe api is not loaded yet. Please refresh the page if it takes more time." : "" }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Screen;