import Slider from "../ui/Slider.jsx";

import { getDurationFromISO, convertDurationFormat } from '../../utils/converters.js';

function ProgressBar({ videoId, playerState, duration, getCurrentTime, seekTo }) {
    return (
        <div className='my-4'>
            <Slider
                min={0}
                max={getDurationFromISO(duration)}
                // value={value}
                // onChange={handleChange}
                // onClick={handleClick}
                // onTouchEnd={handleClick}
                className='w-full'
            />
            <p className='w-full flex justify-between items-center text-sm font-semibold relative bottom-1'>
                <span> {convertDurationFormat(0)} </span>
                <span> {convertDurationFormat(duration)} </span>
            </p>
        </div>
    )
}

export default ProgressBar;