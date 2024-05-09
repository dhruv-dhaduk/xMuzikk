import { useEffect, useRef, useState, useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';

import closeIcon from '/icons/close.svg';
import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';

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
                    className='w-full h-full object-cover blur-xl opacity-50 tablet:blur-sm tablet:opacity-65'
                />
            </div>
            <div className='p-8 w-full h-fit max-h-full bg-opacity-45 overflow-y-scroll tablet:bg-white tablet:backdrop-blur-[35px] tablet:bg-opacity-10'>
                
                <div className='tablet:flex aspect-[2] h-full gap-8'>

                    <div className='aspect-square'>
                        <div className='bg-slate-700 w-full h-full overflow-hidden relative'>
                            <div className='absolute w-full h-full inset-0'>
                                <img 
                                    src={thumbnail}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex-1'>
                        <img src={closeIcon} className='w-10 h-10' />
                        <img src={shareIcon} className='w-10 h-10' />
                        <img src={youtubeIcon} className='w-10 h-10' />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default PlayerPage;