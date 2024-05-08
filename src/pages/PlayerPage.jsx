import { useEffect, useRef, useState, useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';

function PlayerPage({ isPlayerShowing, hidePlayer, className }) {
    const containerRef = useRef(null);
    const isFirstRender = useRef(true);
    const { playingMusic } = useContext(PlayerContext) || {};

    const { id, title, thumbnail, duration, uploadTime, channelTitle } = playingMusic || {};

    useEffect(() => {
        isFirstRender.current = true;
    }, []);

    useEffect(() => {
        if (!isFirstRender.current) {
            if (isPlayerShowing) {
                containerRef.current.classList.remove('animate-hide');
                containerRef.current.classList.add('animate-show');
            }
            else {
                containerRef.current.classList.remove('animate-show');
                containerRef.current.classList.add('animate-hide');
            }
        }

        isFirstRender.current = false;
    }, [isPlayerShowing]);

    return (
        <div 
            ref={containerRef}
            className={`bg-black w-dvw h-dvh fixed inset-x-0 flex justify-center tablet:flex-col tablet:px-3 laptop:px-24 tablet:py-14 ${isPlayerShowing ? 'top-0' : 'top-out'} ${className}`}    
        >
            <div className='-z-10 w-full h-full absolute inset-0'>
                <img 
                    src={thumbnail}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='w-full h-fit max-h-full bg-white bg-opacity-45 overflow-y-scroll'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem, iusto!
            </div>
        </div>
    );
}

export default PlayerPage;