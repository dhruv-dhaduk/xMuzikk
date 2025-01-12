import { useState, useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../contexts/PlayerContext.js';
import Screen from '../components/player/Screen.jsx';

import SideButtons from '../components/player/SideButtons.jsx';
import Title from '../components/player/Title.jsx';
import ProgressBar from '../components/player/ProgressBar.jsx';
import ControlButtons from '../components/player/ControlButtons.jsx';

import { useStoredState } from '../hooks/useStoredState.js';
import { localStorageKeys } from '../constants.js';

import closeIcon from '/icons/close.svg';
import backIcon from '/icons/back.svg';

import Queue from '../components/player/Queue.jsx';

function PlayerPage({
    isPlayerShowing,
    hidePlayer,
    popoverRef,
    playerElementID,
}) {
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

    const { id, title, thumbnail, duration, uploadTime, channelTitle } =
        playingMusic || {};

    const [showVideoToggle, setShowVideoToggle] = useStoredState(
        false,
        localStorageKeys.playVideoToggle
    );

    const [queueVisible, setQueueVisible] = useState(false);

    useEffect(() => {
        popoverRef.current.classList.remove('animate-blink-once-1s');
        if (isPlayerShowing) {
            void popoverRef.current.offsetWidth;
            popoverRef.current.classList.add('animate-blink-once-1s');
        } else {
            setQueueVisible(false);
        }
    }, [isPlayerShowing]);

    return (
        <div
            popover='auto'
            ref={popoverRef}
            className='backdrop:bg-black backdrop:opacity-90 w-96 max-w-[94%] max-h-[90%] p-0 bg-black text-white border border-white border-opacity-25 rounded-xl select-none'
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
                            videoID={id}
                            title={title}
                            channelTitle={channelTitle}
                            uploadTime={uploadTime}
                            hidePlayer={hidePlayer}
                        />

                        <ProgressBar
                            videoID={id}
                            playerState={playerState}
                            duration={duration}
                            getCurrentTime={() => {
                                if (playerRef?.current?.getCurrentTime)
                                    return playerRef?.current?.getCurrentTime();
                                else return 0;
                            }}
                            seekTo={(seconds, allowSeekAhead) => {
                                if (playerRef?.current?.seekTo)
                                    playerRef.current.seekTo(
                                        seconds,
                                        allowSeekAhead
                                    );
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
                    <div className='bg-black w-full h-full overflow-auto relative'>
                        <div className='sticky top-0 w-full flex justify-between items-center h-14 px-2 border-b bg-black border-stone-600'>
                            <button
                                onClick={() => setQueueVisible(false)}
                                className={`aspect-square flex justify-center items-center cursor-pointer active:scale-[0.8] duration-200 w-10 p-2.5 rounded-full bg-white bg-opacity-25`}
                            >
                                <img
                                    src={backIcon}
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                    className='w-full'
                                />
                            </button>

                            <p className='text-xl font-bold'>In Queue</p>

                            <button
                                onClick={hidePlayer}
                                className={`aspect-square flex justify-center items-center cursor-pointer active:scale-[0.8] duration-200 w-10 p-1.5 rounded-full bg-white bg-opacity-25`}
                            >
                                <img
                                    src={closeIcon}
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                    className='w-full'
                                />
                            </button>
                        </div>
                        <div className=''>
                            <Queue
                                queue={queue}
                                playingMusic={playingMusic}
                                playFromQueueAt={playManager.playFromQueueAt}
                                removeFromQueue={playManager.removeFromQueue}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerPage;
