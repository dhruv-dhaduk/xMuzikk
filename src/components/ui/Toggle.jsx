import { useState } from "react";

function Toggle({ className = 'h-10' }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <div
            onClick={() => setIsActive(!isActive)}
            className={`flex aspect-[1.8] p-1 from-primary-light to-primary-dark rounded-full cursor-pointer ${isActive ? 'justify-end bg-gradient-to-r' : 'justify-start bg-black'} ${className}`}
        >
            <div className={`h-full aspect-square rounded-full ${isActive ? 'bg-black' : 'bg-white'}`}></div>
        </div>
    );
}

export default Toggle;