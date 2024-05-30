import { useEffect, useRef } from "react";
import { useState } from "react";

import { getMusicDetails } from '../../dataManager/index.js';

function Queue({ musicIDs, queueVisible, setQueueVisible }) {
    const [musicDetails, setMusicDetails] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateMusicDetails = async () => {
            setMusicDetails(await getMusicDetails(musicIDs, true));
        }

        updateMusicDetails();
    }, [musicIDs]);

    useEffect(() => {
        containerRef.current.classList.remove('animate-blink-once-1s');

        if (queueVisible) {
            void containerRef.offsetWidth;
            containerRef.current.classList.add('animate-blink-once-1s');
        }

    }, [queueVisible]);

    return (
        <div
            onClick={() => setQueueVisible(false)} 
            className={`${queueVisible ? '' : 'hidden'} absolute w-full h-full overflow-scroll bg-black`}
            ref={containerRef}
        >
            { 
                musicDetails.map(musicItem => <QueueItem key={musicItem.id} music={musicItem} />)
            }
        </div>
    );
}

function QueueItem({ music }) {
    return (
        <div className='p-4'>
            { JSON.stringify(music) }
        </div>
    );
}

export default Queue;