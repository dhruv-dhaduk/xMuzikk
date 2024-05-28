import Slider from "../ui/Slider.jsx";

import { getDurationFromISO, convertDurationFormat } from "../../utils/converters.js"; 
import { useCallback, useEffect, useRef, useState } from "react";
import { YTstates } from "../../constants.js";

function ProgressBar({ playerState, duration, getCurrentTime }) {

    const [value, setValue] = useState(0);
    const itvID = useRef(-1);

    const startUpdateTimeInterval = useCallback(() => {
        clearInterval(itvID.current);
        itvID.current = setInterval(() => {
            console.log('Update time interval');
            if (!getCurrentTime) {
                return;
            }
            setValue(getCurrentTime());
        }, 350);
    }, [setValue]);

    useEffect(() => {

        return () => {
            clearInterval(itvID.current);
        }
    }, []);

    useEffect(() => {
        if (playerState === YTstates.PLAYING) {
            startUpdateTimeInterval();
        }
        else {
            clearInterval(itvID.current);
        }
    }, [playerState]);

    return (
        <div className='tablet:mt-auto mb-6 tablet:mb-8'>
            <Slider 
                min={0}
                max={getDurationFromISO(duration)}
                value={value}
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