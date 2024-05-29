import Slider from "../ui/Slider.jsx";

import { getDurationFromISO, convertDurationFormat } from "../../utils/converters.js"; 
import { usePlayerProgressBar } from "../../hooks/usePlayerProgressBar.js";

function ProgressBar({ playerState, duration, getCurrentTime, seekTo }) {

    const [value, handleChange, handleClick] = usePlayerProgressBar(playerState, getCurrentTime, seekTo);

    return (
        <div className='tablet:mt-auto mb-6 tablet:mb-8'>
            <Slider 
                min={0}
                max={getDurationFromISO(duration)}
                value={value}
                onChange={handleChange}
                onClick={handleClick}
                onTouchEnd={handleClick}
                className='w-full'
            />
            <p className='w-full flex justify-between items-center text-sm font-semibold'>
                <span> { convertDurationFormat(value) } </span>
                <span> { convertDurationFormat(duration) } </span>
            </p>
        </div>
    );
}

export default ProgressBar;