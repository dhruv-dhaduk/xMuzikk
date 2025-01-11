import { useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';
import Screen from "../components/player/Screen.jsx";

import closeIcon from '/icons/close.svg';
import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import refreshIcon from '/icons/refresh.svg';
import heartIcon from '/icons/heart_hollow.svg';

function PlayerPage({ isPlayerShowing, showPlayer, hidePlayer, popoverRef }) {
    const {
        isYtApiLoaded,
        playerState,
        playerRef,
        playingMusic,
        queue,
        playManager,
        looping,
        nextLoopingOption,
        refreshPlayer,
    } = useContext(PlayerContext) || {};

    const { id, title, thumbnail, duration, uploadTime, channelTitle } = playingMusic || {};
    
    return (
        <div
            popover='auto'
            ref={popoverRef}
            className='backdrop:bg-black backdrop:opacity-80 w-96 max-w-[94%] max-h-[90%] p-3 bg-black text-white border border-white border-opacity-25 rounded-xl' 
        >
            <div className='-z-10 w-full h-full absolute inset-0'>
                <img
                    src={thumbnail}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className='w-full h-full object-cover blur-xl opacity-50 tablet:blur-sm tablet:opacity-65'
                />
            </div>

            <div className='flex gap-3 h-fit'>
                <div className='flex-1 aspect-square'>
                    <Screen
                        thumbnail={thumbnail}
                    />
                </div>

                <div className='w-12 min-h-full p-1 flex flex-col items-center justify-between'>
                    <Btn
                        iconSrc={closeIcon}
                        className='bg-white rounded-full bg-opacity-25 p-[6px]'
                        onClick={hidePlayer}
                    />
                    <Btn
                        iconSrc={shareIcon}
                        className='p-[7px]'
                    />
                    <Btn
                        iconSrc={youtubeIcon}
                        className='p-[7px]'
                    />
                    <Btn
                        iconSrc={refreshIcon}
                        className='p-[7px]'
                    />
                    <Btn
                        iconSrc={heartIcon}
                        className='p-[6px]'
                    />
                </div>
            </div>

            <div className='h-44'>

            </div>
        </div>
    )
}

function Btn({ iconSrc, className, onClick }) {
    return (
        <button
            className={`w-full aspect-square ${className}`}
            onClick={onClick}
        >
            <img
                src={iconSrc}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                className='w-full h-full'
            />
        </button>
    )
}

export default PlayerPage;