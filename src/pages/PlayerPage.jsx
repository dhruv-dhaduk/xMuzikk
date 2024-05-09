import { useEffect, useRef, useState, useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';

import closeIcon from '/icons/close.svg';
import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import heartHollowIcon from '/icons/heart_hollow.svg';
import loopIcon from '/icons/loop.svg';
import previousIcon from '/icons/previous.svg';
import pauseIcon from '/icons/pause.svg';
import nextIcon from '/icons/next.svg';
import queueIcon from '/icons/queue.svg';

import Toggle from "../components/ui/Toggle.jsx";
import Slider from "../components/ui/Slider.jsx";

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
            <div className='relative p-6 tablet:p-8 w-full h-full bg-opacity-45 overflow-y-scroll tablet:bg-white tablet:backdrop-blur-[35px] tablet:bg-opacity-10'>
                
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

                    <div className='flex-1 bg-blackk flex flex-col justify-start'>

                        <div className='absolute right-6 bottom-6 tablet:static flex justify-start items-center tablet:w-full'>
                            <Icon imgSrc={youtubeIcon} className='w-16 p-4 rounded-full' />
                            <Icon imgSrc={shareIcon} className='w-16 p-4 rounded-full' />
                            <Icon imgSrc={closeIcon} className='tablet:ml-auto w-16 p-2 rounded-full bg-white bg-opacity-25' />
                        </div>

                        <div className='flex items-start justify-between mt-8 mb-8'>
                            <div className='flex-1'>
                                <p className='line-clamp-1 tablet:line-clamp-2 text-xl font-bold mb-1.5'>
                                    { title }
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta maxime possimus placeat. Voluptates, blanditiis quae. Hic vitae aspernatur doloremque saepe?
                                </p>

                                <p className='line-clamp-1 text-sm'>
                                    { channelTitle }
                                    <span className='mx-2 font-bold'>·</span>
                                    3 years ago
                                </p>
                            </div>

                            <Icon imgSrc={heartHollowIcon} className='flex-none w-12 p-0' />
                        </div>

                        <div className='absolute left-6 bottom-6 tablet:static flex items-center justify-between gap-2'>
                            <div className='flex flex-col items-center justify-center'>
                                <Toggle isActive={false} className='h-8' />
                                <p className='line-clamp-1 text-sm'>Play Video</p>
                            </div>
                            <div className='hidden tablet:flex flex-col justify-center w-full max-w-60'>
                                <Slider />
                                <p className='line-clamp-1 text-sm flex items-center justify-between'>
                                    <span>Volume</span>
                                    <span>70%</span>
                                </p>
                            </div>
                        </div>

                        <div className='my-8 mt-auto'>
                            <Slider className='w-full' />
                            <p className='w-full flex items-center justify-between text-sm'>
                                <span>02:11</span>
                                <span>03:54</span>
                            </p>
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                            <Icon imgSrc={loopIcon} className='w-16 p-3.5' />
                            <Icon imgSrc={previousIcon} className='w-16 p-3.5' />
                            <Icon imgSrc={pauseIcon} className='w-20 p-5 rounded-full bg-white bg-opacity-25' />
                            <Icon imgSrc={nextIcon} className='w-16 p-3.5' />
                            <Icon imgSrc={queueIcon} className='w-16 p-3.5' />
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