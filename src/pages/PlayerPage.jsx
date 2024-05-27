import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';

import { convertUploadTimeFormat, convertDurationFormat, getDurationFromISO } from '../utils/converters.js';

import closeIcon from '/icons/close.svg';
import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import heartHollowIcon from '/icons/heart_hollow.svg';
import loopIcon from '/icons/loop.svg';
import previousIcon from '/icons/previous.svg';
import pauseIcon from '/icons/pause.svg';
import playIcon from '/icons/play.svg';
import nextIcon from '/icons/next.svg';
import queueIcon from '/icons/queue.svg';

import Toggle from "../components/ui/Toggle.jsx";
import Slider from "../components/ui/Slider.jsx";

import { YTstates } from "../constants.js";

function PlayerPage({ playerElementID, isPlayerShowing, hidePlayer, className }) {
    const containerRef = useRef(null);
    const isFirstRender = useRef(true);

    const { isYtApiLoaded, playerState, playerRef, playingMusic } = useContext(PlayerContext) || {};

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
            className={`flex tablet:flex-col justify-center w-dvw h-dvh fixed inset-x-0 tablet:px-3 laptop:px-24 tablet:py-14 bg-black select-none ${isPlayerShowing ? 'top-0' : 'top-out'} ${className}`}    
        >
            <div className='-z-10 w-full h-full absolute inset-0'>
                <img 
                    src={thumbnail}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                    className='w-full h-full object-cover blur-xl opacity-50 tablet:blur-sm tablet:opacity-65'
                />
            </div>
            <div className='w-full h-full p-6 tablet:p-8 overflow-y-scroll tablet:bg-white tablet:backdrop-blur-[35px] tablet:bg-opacity-10 rounded-2xl'>
                
                <div className='flex flex-col tablet:flex-row w-full h-full gap-5 aspect-[2]'>

                    <div className='flex-none tablet:flex-initial aspect-square'>
                        <div className='w-full h-full flex justify-center relative overflow-hidden bg-slate-700 rounded-2xl'>
                            <div className='w-full h-full absolute inset-0'>
                                <img 
                                    src={thumbnail}
                                    draggable={false}
                                    onContextMenu={e => e.preventDefault()}
                                    className={`w-full h-full object-cover opacity-0`}
                                />
                            </div>

                            <div className='h-full aspect-video'>
                                <div
                                    id={playerElementID}
                                    className='w-full h-full pointer-events-none'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 flex flex-col justify-start'>

                        <div className='w-full hidden tablet:flex justify-start items-center gap-2'>
                            <Icon imgSrc={youtubeIcon} className='w-16 p-4 rounded-full' />
                            <Icon imgSrc={shareIcon} className='w-16 p-4 rounded-full' />
                            <Icon imgSrc={closeIcon} onClick={hidePlayer} className='w-16 ml-auto p-2 bg-white bg-opacity-25 rounded-full' />
                        </div>

                        <div className='flex justify-between items-start mt-3 tablet:mt-8 mb-8'>

                            <div className='flex-1'>
                                <p className='mb-0.5 tablet:mb-1.5 text-xl font-bold line-clamp-1 tablet:line-clamp-2'>
                                    { title }
                                </p>

                                <p className='text-sm line-clamp-1'>
                                    { channelTitle }
                                    <span className='mx-2 font-bold'>·</span>
                                    { convertUploadTimeFormat(uploadTime) }
                                </p>
                            </div>

                            <Icon imgSrc={heartHollowIcon} className='flex-none w-10 tablet:w-12 p-0' />
                        </div>

                        <div className='hidden tablet:flex justify-between items-center gap-2'>
                            <div className='flex flex-col justify-center items-center'>
                                <Toggle className='h-8' />
                                <p className='text-sm line-clamp-1'>Play Video</p>
                            </div>
                            <div className='w-full max-w-60 flex flex-col justify-center'>
                                <Slider />
                                <p className='flex justify-between items-center text-sm line-clamp-1'>
                                    <span>Volume</span>
                                    <span>70%</span>
                                </p>
                            </div>
                        </div>

                        <div className='tablet:mt-auto mb-6 tablet:mb-8'>
                            <Slider min={0} max={getDurationFromISO(duration)} value={0} className='w-full' />
                            <p className='w-full flex justify-between items-center text-sm font-semibold'>
                                <span> { convertDurationFormat(0) } </span>
                                <span> { convertDurationFormat(duration) } </span>
                            </p>
                        </div>

                        <div className='flex justify-center items-center gap-3 mb-10'>
                            <Icon imgSrc={loopIcon} className='w-16 p-3.5' />
                            <Icon imgSrc={previousIcon} className='w-16 p-3.5' />
                            <Icon 
                                imgSrc={pauseIcon} 
                                className='w-20 p-5 bg-white bg-opacity-25 rounded-full'
                            />
                            <Icon imgSrc={nextIcon} className='w-16 p-3.5' />
                            <Icon imgSrc={queueIcon} className='w-16 p-3.5' />
                        </div>

                        <div className='tablet:hidden flex justify-start items-center gap-1 mt-auto'>
                            <div className='flex flex-col justify-center items-center'>
                                <Toggle className='h-7' />
                                <p className='text-xs line-clamp-1'>Play Video</p>
                            </div>
                            <Icon imgSrc={youtubeIcon} className='w-12 p-3 ml-auto rounded-full' />
                            <Icon imgSrc={shareIcon} className='w-12 p-3 rounded-full' />
                            <Icon imgSrc={closeIcon} onClick={hidePlayer} className='w-14 p-2.5 bg-white bg-opacity-25 rounded-full' />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function Icon({ imgSrc, className, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`aspect-square cursor-pointer active:scale-[0.8] duration-200 ${className}`}
        >
            <img 
                src={imgSrc}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                className='w-full h-full object-cover'
            />
        </div>
    );
}

export default PlayerPage;