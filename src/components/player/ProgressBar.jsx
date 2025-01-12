import Slider from '../ui/Slider.jsx';

import {
    getDurationFromISO,
    convertDurationFormat,
} from '../../utils/converters.js';

import { usePlayerProgressBar } from '../../hooks/usePlayerProgressBar.js';
import { useEffect } from 'react';
import { localStorageKeys } from '../../constants.js';

function ProgressBar({
    videoID,
    playerState,
    duration,
    getCurrentTime,
    seekTo,
}) {
    const [value, handleChange, handleClick] = usePlayerProgressBar(
        playerState,
        getCurrentTime,
        seekTo
    );

    useEffect(() => {
        if (!value || videoID?.length !== 11) return;
        localStorage.setItem(
            localStorageKeys.currentTime,
            `${videoID}${parseInt(value)}`
        );
    }, [value]);

    return (
        <div className='my-4'>
            <Slider
                min={0}
                max={getDurationFromISO(duration)}
                value={value}
                onChange={handleChange}
                onClick={handleClick}
                onTouchEnd={handleClick}
                className='w-full'
            />
            <p className='w-full flex justify-between items-center text-sm font-semibold relative bottom-1'>
                <span> {convertDurationFormat(value)} </span>
                <span> {convertDurationFormat(duration)} </span>
            </p>
        </div>
    );
}

export default ProgressBar;
