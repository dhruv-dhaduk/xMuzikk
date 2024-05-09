import { useState } from "react";

function Toggle({ className = 'h-10' }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <div
            onClick={() => setIsActive(!isActive)}
            className={`aspect-[1.8] p-1 flex rounded-full cursor-pointer ${isActive ? 'justify-end bg-gradient-to-r' : 'justify-start bg-black'} from-primary-light to-primary-dark ${className}`}
        >
            <div className={`aspect-square h-full rounded-full ${isActive ? 'bg-black' : 'bg-white'}`}></div>
        </div>
    );
}

export default Toggle;