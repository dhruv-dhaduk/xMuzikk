import Slider from "../ui/Slider.jsx";

import { getDurationFromISO, convertDurationFormat } from "../../utils/converters.js"; 

function ProgressBar({ duration }) {
    return (
        <div className='tablet:mt-auto mb-6 tablet:mb-8'>
            <Slider min={0} max={getDurationFromISO(duration)} value={0} className='w-full' />
            <p className='w-full flex justify-between items-center text-sm font-semibold'>
                <span> { convertDurationFormat(0) } </span>
                <span> { convertDurationFormat(duration) } </span>
            </p>
        </div>
    );
}

export default ProgressBar;