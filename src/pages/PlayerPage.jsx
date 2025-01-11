import { useState, useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';
import Screen from "../components/player/Screen.jsx";

import SideButtons from "../components/player/SideButtons.jsx";
import Title from "../components/player/Title.jsx";
import ProgressBar from "../components/player/ProgressBar.jsx";
import ControlButtons from "../components/player/ControlButtons.jsx";

import { useStoredState } from '../hooks/useStoredState.js';
import { localStorageKeys } from '../constants.js';

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

    const [showVideoToggle, setShowVideoToggle] = useStoredState(false, localStorageKeys.playVideoToggle);

    const [queueVisible, setQueueVisible] = useState(false);
    
    return (
        <div
            popover='auto'
            ref={popoverRef}
            className='backdrop:bg-black backdrop:opacity-90 w-96 max-w-[94%] max-h-[90%] p-0 bg-black text-white border border-white border-opacity-25 rounded-xl' 
        >

            <div
                className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${queueVisible ? '[transform:rotateY(180deg)]' : ''}`}
            >
                <div className='p-3 [backface-visibility:hidden]'>

                    <div className='-z-10 w-full h-full absolute inset-0'>
                        <img
                            src={thumbnail}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            className='w-full h-full object-cover blur-xl opacity-50'
                        />
                    </div>

                    <div className='flex gap-3 h-fit'>
                        <div className='flex-1 aspect-square bg-black rounded-2xl'>
                            <Screen
                                thumbnail={thumbnail}
                                isYtApiLoaded={isYtApiLoaded}
                                playerElementID={playerElementID}
                                playerState={playerState}
                                showVideoToggle={showVideoToggle}
                                setShowVideoToggle={setShowVideoToggle}
                            />
                        </div>

                        <SideButtons
                            videoID={id}
                            title={title}
                            hidePlayer={hidePlayer}
                            refreshPlayer={refreshPlayer}
                        />
                        
                    </div>

                    <div className='mt-3 mb-4'>
                        
                        <Title
                            title={title}
                            channelTitle={channelTitle}
                            uploadTime={uploadTime}
                        />

                        <ProgressBar
                            videoId={id}
                            playerState={playerState}
                            duration={duration}
                            getCurrentTime={() => {
                                if (playerRef?.current?.getCurrentTime)
                                    return playerRef?.current?.getCurrentTime();
                                else
                                    return 0;
                            }}
                            seekTo={(seconds, allowSeekAhead) => {
                                if (playerRef?.current?.seekTo)
                                    playerRef.current.seekTo(seconds, allowSeekAhead);
                            }}
                        />

                        <ControlButtons
                            playerState={playerState}
                            playpause={playerRef.current.playpause}
                            looping={looping}
                            nextLoopingOption={nextLoopingOption}
                            showQueue={() => setQueueVisible(true)}
                            playPreviousMusic={playManager.playPreviousMusic}
                            playNextMusic={playManager.playNextMusic}
                        />

                    </div>
                </div>

                <div className='bg-black absolute w-full h-full overflow-hidden inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                    <div
                        className='bg-blue-700 w-full h-full overflow-auto relative'
                        onClick={() => setQueueVisible(false)}
                    >
                        <div className='sticky top-0 w-full h-14 bg-red-700 p-3'>
                            Heading
                        </div>
                        <div className='p-3'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem rem quo ipsum repudiandae necessitatibus soluta optio ab sunt, cupiditate praesentium sed non odio ratione a dolor molestias dolorem provident quae eos tempora atque veniam quaerat alias? Suscipit labore tenetur cum commodi eius quo qui consequuntur dolores in sunt non laboriosam, soluta molestiae, ad possimus aspernatur eaque minus explicabo voluptates earum vero totam animi. Ipsam voluptates, tempore amet, cupiditate sed mollitia doloribus officia error temporibus quas quasi repudiandae eos ea. Non neque expedita at adipisci necessitatibus placeat pariatur quidem libero eius ea repellat odio similique, corrupti rerum quas hic cumque exercitationem.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PlayerPage;