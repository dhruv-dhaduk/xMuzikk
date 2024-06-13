import PlaylistItem from './PlaylistItem.jsx';
import Popover from './ui/Popover.jsx';
import { PlayerContext } from '../contexts/PlayerContext.js';
import { useContext, useEffect, useState } from 'react';

function PlaylistFeed({ playlistItems }) {
    const playerContext = useContext(PlayerContext);
    const [showAddToPopover, setShowAddToPopover] = useState(false);
    const [popoverMusicDetails, setPopoverMusicDetails] = useState({});

    if (!playlistItems?.length) {
        return (
            <LoadingFeed />
        )
    }

    return (

        <>
            <div>
                {
                    playlistItems.map((item, index) => (
                        <PlaylistItem
                            key={item.id}
                            item={item}
                            index={index + 1}
                            isPlaying={item.id === playerContext?.playingMusic?.id}
                            playMusic={() => playerContext.playManager.playMusic(item)}
                            showPlayer={playerContext.showPlayer}
                            handleAddTo={() => { setPopoverMusicDetails(item); setShowAddToPopover(true); } }
                        />
                    ))  
                }
            </div>
                        
            <Popover
                popoverShowing={showAddToPopover}
                setPopoverShowing={setShowAddToPopover}
                className='backdrop:bg-black backdrop:opacity-80 w-72 max-w-[90%] max-h-[90%] p-4 bg-black text-white border border-white border-opacity-30 rounded-2xl'
            >
                <p className='line-clamp-2'>
                    { popoverMusicDetails.title }
                </p>
                
                <button
                    onClick={() => { playerContext.playManager.addToQueue(popoverMusicDetails.id); setShowAddToPopover(false); }}
                    className='w-full h-9 mt-4 bg-[#101010] text-white text-[14px] font-semibold rounded-full border border-white border-opacity-20 active:scale-90 duration-200'
                >
                    Add To Queue
                </button>

                <button
                    onClick={() => setShowAddToPopover(false)}
                    className='w-full h-9 mt-4 bg-white text-black text-[17px] font-bold rounded-full active:bg-opacity-80'
                >
                    Cancel
                </button>
            </Popover>
        </>
    )
}

function LoadingFeed({ count = 10 }) {
    return (
        <div>
            { 
                Array(count).fill(0).map((_, i) => <LoadingFeedItem key={i} />)
            }
        </div>
    );
}

function LoadingFeedItem() {
    return (
        <div className='flex gap-2 p-3'>
            <div className='loading flex-none w-[6.5rem] aspect-square rounded-xl'>
            </div>

            <div className='flex-1 flex flex-col justify-start gap-3 pt-3'>
                <div className='loading w-full h-4 rounded'></div>
                <div className='loading w-full h-4 rounded'></div>
                <div className='loading w-1/2 h-4 rounded'></div>
            </div>
        </div>
    );
}

export default PlaylistFeed;