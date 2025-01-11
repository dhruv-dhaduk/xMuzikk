import { useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';
import Screen from "../components/player/Screen.jsx";

import SideButtons from "../components/player/SideButtons.jsx";
import Title from "../components/player/Title.jsx";
import ProgressBar from "../components/player/ProgressBar.jsx";
import ControlButtons from "../components/player/ControlButtons.jsx";

function PlayerPage({ isPlayerShowing, showPlayer, hidePlayer, popoverRef, playerElementID }) {
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
            className='backdrop:bg-black backdrop:opacity-90 w-96 max-w-[94%] max-h-[90%] p-3 bg-black text-white border border-white border-opacity-25 rounded-xl' 
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
                        playerElementID={playerElementID}
                    />
                </div>

                <SideButtons />
                
            </div>

            <div className='mt-3 mb-4'>
                
                <Title
                    title={title}
                    channelTitle={channelTitle}
                    uploadTime={uploadTime}
                />

                <ProgressBar
                    duration={duration}
                />

                <ControlButtons />

            </div>
        </div>
    )
}

export default PlayerPage;