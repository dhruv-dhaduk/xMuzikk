import { useEffect, useRef, useState } from "react";

function PlayerPage({ isPlayerShowing, hidePlayer, className }) {
    const [count, setCount] = useState(0);
    const containerRef = useRef(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        isFirstRender.current = true;
    }, []);

    useEffect(() => {
        if (!isFirstRender.current) {
            if (isPlayerShowing) {
                containerRef.current.classList.remove('animate-hide');
                containerRef.current.classList.add('animate-show');
            }
            else {
                containerRef.current.classList.remove('animate-show');
                containerRef.current.classList.add('animate-hide');
            }
        }

        isFirstRender.current = false;
    }, [isPlayerShowing]);

    return (
        <div 
            ref={containerRef}
            className={`bg-black w-dvw h-dvh fixed p-4 inset-x-0 ${isPlayerShowing ? 'top-0' : 'top-out'} ${className}`}    
        >
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