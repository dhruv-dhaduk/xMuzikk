import { useEffect, useRef, useState } from "react";

function PlayerPage({ isPlayerShowing, hidePlayer }) {
    const [count, setCount] = useState(0);
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current)
            isFirstRender.current = false;
    }, []);

    let showHideClasses = '';
    if (isPlayerShowing) {
        if (!isFirstRender.current) 
            showHideClasses += 'animate-show';
        showHideClasses += ' top-0';
    }
    else {
        if (!isFirstRender.current)
            showHideClasses += 'animate-hide';
        showHideClasses += ' top-full';
    }
    return (
        <div className={`z-[100] bg-red-900 w-dvw h-dvh fixed p-4 inset-x-0 ${showHideClasses}`}>
            <div className='h-full w-full border border-white'>
                <button 
                    className='bg-white text-black font-bold rounded p-4'
                    onClick={hidePlayer}
                >
                    Hide Player
                </button>
                <button 
                    className='bg-white text-black font-bold rounded p-4'
                    onClick={() => setCount(count + 1)}
                >
                    Increment { count }
                </button>
            </div>
        </div>
    );
}

export default PlayerPage;