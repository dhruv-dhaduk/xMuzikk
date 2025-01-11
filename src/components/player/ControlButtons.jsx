import loopIcon from '/icons/loop.svg';
import loopOnceIcon from '/icons/loop_once.svg';
import shuffleIcon from '/icons/shuffle.svg';
import previousIcon from '/icons/previous.svg';
import playIcon from '/icons/play.svg';
import pauseIcon from '/icons/pause.svg';
import nextIcon from '/icons/next.svg';
import queueIcon from '/icons/queue.svg';


function ControlButtons({ playerState, playpause, looping, nextLoopingOption, showQueue, playPreviousMusic, playNextMusic }) {
    return (
        <div className='flex justify-center items-center gap-3'>
            <PlayerBtn
                // onClick={nextLoopingOption}
                imgSrc={loopIcon}
                className='w-16 p-3.5'
            />
            <PlayerBtn
                // onClick={playPreviousMusic}
                imgSrc={previousIcon}
                className='w-16 p-3.5'
            />
            <PlayerBtn
                // onClick={playpause}
                // imgSrc={
                //     playerState === YTstates.BUFFERING ||
                //     playerState === YTstates.PLAYING
                //         ? pauseIcon
                //         : playIcon
                // }
                imgSrc={pauseIcon}
                // className={`w-20 p-5 bg-white bg-opacity-25 rounded-full ${playerState === YTstates.BUFFERING ? 'animate-blink' : ''}`}
                className={`w-20 p-5 bg-white bg-opacity-25 rounded-full`}
            />
            <PlayerBtn
                // onClick={playNextMusic}
                imgSrc={nextIcon}
                className='w-16 p-3.5'
            />
            <PlayerBtn
                // onClick={showQueue}
                imgSrc={queueIcon}
                className='w-16 p-3.5'
            />
        </div>
    )
}

function PlayerBtn({ imgSrc, className, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`aspect-square flex justify-center items-center cursor-pointer active:scale-[0.8] duration-200 ${className}`}
        >
            <img
                src={imgSrc}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className='w-full'
            />
        </div>
    );
}

export default ControlButtons;