import { useEffect, useRef, useState, useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';

import closeIcon from '/icons/close.svg';
import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import heartHollowIcon from '/icons/heart_hollow.svg';

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
                
                <div className='tablet:flex aspect-[2] h-full gap-5 w-full'>

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

                    <div className='flex-1 bg-blackk'>
                        <div className='flex justify-start items-center w-full'>
                            <Icon imgSrc={youtubeIcon} className='w-16 p-4 rounded-full' />
                            <Icon imgSrc={shareIcon} className='w-16 p-4 rounded-full' />
                            <Icon imgSrc={closeIcon} className='ml-auto w-16 p-2 rounded-full bg-white bg-opacity-25' />
                        </div>

                        <div className='flex items-start justify-between mt-8'>
                            <div className='flex-1'>
                                <p className='line-clamp-2 text-xl font-bold mb-1.5'>
                                    { title }
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta maxime possimus placeat. Voluptates, blanditiis quae. Hic vitae aspernatur doloremque saepe?
                                </p>

                                <p className='line-clamp-1 text-sm'>
                                    { channelTitle }
                                    <span className='mx-2 font-bold'>·</span>
                                    3 years ago
                                </p>
                            </div>

                            <Icon imgSrc={heartHollowIcon} className='flex-none w-16 p-2' />
                        </div>

                        <div>
                            
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function Icon({ imgSrc, className }) {
    return (
        <div className={`aspect-square ${className}`}>
            <img 
                src={imgSrc}
                className='w-full h-full object-cover'
            />
        </div>
    );
}

export default PlayerPage;