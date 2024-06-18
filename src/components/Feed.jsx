import FeedItem from "./FeedItem";
import Popover from "./ui/Popover.jsx";
import { PlayerContext } from '../contexts/PlayerContext.js';
import { useContext, useEffect, useState } from "react";

import AsyncSubmitBtn from './AsyncSubmitBtn.jsx';

function Feed({ musicList }) {
    const playerContext = useContext(PlayerContext);
    const [popoverShowing, setPopoverShowing] = useState(false);
    const [popoverMusicDetails, setPopoverMusicDetails] = useState({});

    const [userPlaylists, setUserPlaylists] = useState([]);

    useEffect(() => {
        if (popoverShowing) {
            document.body
        }
    }, [popoverShowing]);

    return (
        <>
            <div className={`grid grid-cols-1 tablet:grid-cols-feed tablet:gap-x-6 target:gap-y-12 tablet:p-6 ${popoverShowing ? 'pointer-events-none' : ''}`}>
                {
                    musicList.map(item => (
                        <FeedItem
                            key={item.id}
                            music={item}
                            isPlaying={item.id === playerContext?.playingMusic?.id}
                            playMusic={() => playerContext.playManager.playMusic(item)}
                            showPlayer={playerContext.showPlayer}
                            showMoreOptions={() => { setPopoverMusicDetails(item); setPopoverShowing(true); } }
                        />
                    ))
                }
            </div>

            <Popover
                popoverShowing={popoverShowing}
                setPopoverShowing={setPopoverShowing}
                className='backdrop:bg-black backdrop:opacity-80 w-72 max-w-[90%] max-h-[90%] p-4 bg-black text-white border border-white border-opacity-30 rounded-2xl'
            >
                <p className='line-clamp-2'>
                    { popoverMusicDetails.title }
                </p>
                
                <button
                    onClick={() => { playerContext.playManager.addToQueue(popoverMusicDetails.id); setPopoverShowing(false); }}
                    className='w-full h-9 mt-4 bg-[#101010] text-white text-[14px] font-semibold rounded-full border border-white border-opacity-20 active:scale-90 duration-200'
                >
                    Add To Queue
                </button>

                {
                    userPlaylists.length > 0 && (
                        <div className='w-full mt-4 p-2 rounded-lg bg-[#101010] border border-white border-opacity-20'>
                            <p className='mb-2 font-semibold'>
                                Add to playlist
                            </p>

                            <div className='w-full max-h-48 px-2 overflow-y-auto'>
                                {
                                    userPlaylists.map((playlist, i) => (
                                        <AsyncSubmitBtn
                                            key={i}
                                            className='w-full h-7 my-2 flex justify-center items-center rounded-md bg-[#1e1e1e] border border-white border-opacity-10 active:scale-90 duration-200'
                                            loadingClassName='w-full h-7 my-2 flex justify-center items-center rounded-md bg-[#1e1e1e] border border-white border-opacity-10'
                                            spinnerSize={20}
                                        >
                                            <span className='text-xs line-clamp-1 break-all'>
                                                { playlist.title }
                                            </span>
                                        </AsyncSubmitBtn>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                <button
                    onClick={() => setPopoverShowing(false)}
                    className='w-full h-9 mt-4 bg-white text-black text-[17px] font-bold rounded-full active:bg-opacity-80'
                >
                    Cancel
                </button>
            </Popover>
        </>
    );
}

export default Feed;