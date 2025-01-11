import { useEffect, useRef, useContext, useState } from 'react';
import { PlayerContext } from '../contexts/PlayerContext.js';

import Screen from '../components/player/Screen.jsx';
import {
    OtherButtonsLg,
    ShowVideoToggleAndVolumeBarLg,
    OtherButtonsSm,
} from '../components/player/OtherButtons.jsx';
import TitlesAndLike from '../components/player/TitlesAndLike.jsx';
import ProgressBar from '../components/player/ProgressBar.jsx';
import ControlButtons from '../components/player/ControlButtons.jsx';
import { useStoredState } from '../hooks/useStoredState.js';
import { localStorageKeys } from '../constants.js';
import Queue from '../components/player/Queue.jsx';

function PlayerPage({
    playerElementID,
    isPlayerShowing,
    hidePlayer,
    className,
}) {
    const containerRef = useRef(null);
    const isFirstRender = useRef(true);

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
        isFirstRender.current = true;
    }, []);

    useEffect(() => {
        if (!isFirstRender.current) {
            if (isPlayerShowing) {
                containerRef.current.classList.remove('animate-hide');
                containerRef.current.classList.add('animate-show');
            } else {
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
                    onContextMenu={(e) => e.preventDefault()}
                    className='w-full h-full object-cover blur-xl opacity-50 tablet:blur-sm tablet:opacity-65'
                />
            </div>
            <div className='w-full h-full p-6 tablet:p-8 overflow-y-scroll tablet:bg-white tablet:backdrop-blur-[35px] tablet:bg-opacity-10 rounded-2xl'>
                <div className='flex flex-col tablet:flex-row w-full h-full gap-5 aspect-[2]'>
                    <Screen
                        thumbnail={thumbnail}
                        isYtApiLoaded={isYtApiLoaded}
                        playerElementID={playerElementID}
                        playerState={playerState}
                        showVideoToggle={showVideoToggle}
                    />

                    <div className='flex-1 flex flex-col justify-start relative'>
                        <OtherButtonsLg
                            id={id}
                            title={title}
                            hidePlayer={hidePlayer}
                            refreshPlayer={refreshPlayer}
                        />

                        <TitlesAndLike
                            title={title}
                            channelTitle={channelTitle}
                            uploadTime={uploadTime}
                        />

                        <ShowVideoToggleAndVolumeBarLg
                            showVideoToggle={showVideoToggle}
                            setShowVideoToggle={setShowVideoToggle}
                        />

                        <ProgressBar
                            id={id}
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

                        <OtherButtonsSm
                            id={id}
                            title={title}
                            hidePlayer={hidePlayer}
                            showVideoToggle={showVideoToggle}
                            setShowVideoToggle={setShowVideoToggle}
                            refreshPlayer={refreshPlayer}
                        />

                        <Queue
                            queue={queue}
                            queueVisible={queueVisible}
                            setQueueVisible={setQueueVisible}
                            playingMusic={playingMusic}
                            playFromQueueAt={playManager.playFromQueueAt}
                            removeFromQueue={playManager.removeFromQueue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerPage;
