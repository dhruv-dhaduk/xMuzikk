import Slider from "../ui/Slider.jsx";

import { getDurationFromISO, convertDurationFormat } from "../../utils/converters.js"; 
import { usePlayerProgressBar } from "../../hooks/usePlayerProgressBar.js";
import { useEffect } from "react";

import { localStorageKeys } from "../../constants.js";

function ProgressBar({ id, playerState, duration, getCurrentTime, seekTo }) {

    const [value, handleChange, handleClick] = usePlayerProgressBar(playerState, getCurrentTime, seekTo);

    useEffect(() => {
        if (!value || id?.length !== 11) return;
        localStorage.setItem(localStorageKeys.currentTime, `${id}${parseInt(value)}`);
    }, [value]);

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