import Icon from "./Icon.jsx";

import loopIcon from '/icons/loop.svg';
import loopOnceIcon from '/icons/loop_once.svg';
import shuffleIcon from '/icons/shuffle.svg';
import previousIcon from '/icons/previous.svg';
import playIcon from '/icons/play.svg';
import pauseIcon from '/icons/pause.svg';
import nextIcon from '/icons/next.svg';
import queueIcon from '/icons/queue.svg';

import { YTstates, loopingOptions } from '../../constants.js';

function ControlButtons({ playerState, playpause, looping, nextLoopingOption, showQueue, playPreviousMusic, playNextMusic }) {
    let loopingIcon = loopIcon;
    if (looping === loopingOptions.LOOP_ONCE)
        loopingIcon = loopOnceIcon;
    else if (looping === loopingOptions.SHUFFLE)
        loopingIcon = shuffleIcon;
    
    return (
        <div className='flex justify-center items-center gap-3 mb-10'>
            <Icon
                onClick={nextLoopingOption}
                imgSrc={loopingIcon}
                className='w-16 p-3.5'
            />
            <Icon
                imgSrc={previousIcon}
                className='w-16 p-3.5'
            />
            <Icon
                onClick={playpause}
                imgSrc={playerState === YTstates.BUFFERING || playerState === YTstates.PLAYING ? pauseIcon : playIcon } 
                className={`w-20 p-5 bg-white bg-opacity-25 rounded-full ${playerState === YTstates.BUFFERING ? 'animate-blink' : ''}`}
            />
            <Icon
                imgSrc={nextIcon}
                className='w-16 p-3.5'
            />
            <Icon
                onClick={showQueue}
                imgSrc={queueIcon} 
                className='w-16 p-3.5'
            />
        </div>
    );
}

export default ControlButtons;