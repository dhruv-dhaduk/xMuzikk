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

import Screen from "../components/player/Screen.jsx";
import { OtherButtonsLg, ShowVideoToggleAndVolumeBarLg, OtherButtonsSm } from "../components/player/OtherButtons.jsx";
import TitlesAndLike from "../components/player/TitlesAndLike.jsx";
import ProgressBar from "../components/player/ProgressBar.jsx";
import ControlButtons from "../components/player/ControlButtons.jsx";

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

                    <Screen
                        thumbnail={thumbnail}
                        isYtApiLoaded={isYtApiLoaded} 
                        playerElementID={playerElementID} 
                    />

                    <div className='flex-1 flex flex-col justify-start'>

                        <OtherButtonsLg hidePlayer={hidePlayer} />

                        <TitlesAndLike
                            title={title}
                            channelTitle={channelTitle}
                            uploadTime={uploadTime}
                        />

                        <ShowVideoToggleAndVolumeBarLg />

                        <ProgressBar duration={duration} />

                        <ControlButtons />

                        <OtherButtonsSm hidePlayer={hidePlayer} />
                        
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