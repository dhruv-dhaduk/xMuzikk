import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import saveHollowIcon from '/icons/save_hollow.svg';
import saveFilledIcon from '/icons/save_filled.svg';

import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext.js';

function PlaylistMetaData({ playlist }) {
    const { playManager } = useContext(PlayerContext);
    
    return (
        <div className='select-none'>
            <div className='aspect-square rounded-2xl overflow-hidden'>
                <img
                    src={playlist.thumbnail}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                    className='w-full h-full object-cover'
                />
            </div>

            <p className='mt-2 text-xl font-bold line-clamp-2 break-all'>
                { playlist.title }
            </p>


            <p className='text-sm line-clamp-1 break-all'>

                {
                    playlist.channelTitle && (
                        <>
                            <span className=''>
                                { playlist.channelTitle }   
                            </span>

                            <span className='px-1.5 font-bold text-lg'>·</span>
                        </>
                    )
                }


                { playlist.itemCount } songs
            </p>

            <div className='flex justify-between items-center flex-wrap mt-2'>
                <div className='flex justify-start items-center flex-wrap gap-1'>

                    <Icon iconSrc={saveHollowIcon} />
                    <Icon
                        iconSrc={shareIcon}
                        onClick={() => {
                            navigator.share({
                                title: playlist.title,
                                url: `${window.location.origin}/playlist/${playlist.$id}`
                            });
                        }}
                    />
                    {
                        playlist.ytId && (
                            <Icon
                                iconSrc={youtubeIcon}
                                onClick={() => {
                                    const isConfirmed = window.confirm('Open this playlist in YouTube ? ');
                                    if (isConfirmed) {
                                        window.open(`https://www.youtube.com/playlist?list=${playlist.ytId}`);
                                    }
                                }}
                            />
                        )
                    }
                </div>

                <button
                    onClick={() => {
                        playManager.loadPlaylist(playlist.items);
                    }} 
                    className='bg-white text-black font-semibold h-10 px-4 rounded-full whitespace-nowrap active:bg-opacity-80'
                >
                    Play All
                </button>
            </div>
                    
            {
                playlist.ytId && (
                    <p className='text-xs py-2'>
                        This playlist is copied from youtube. Some songs might be missing or they won't play if they are private or unlisted.
                    </p>
                )
            }

        </div>
    );
}

function Icon({ iconSrc, className, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`aspect-square w-14 p-4 rounded-full bg-white bg-opacity-15 active:bg-opacity-30 cursor-pointer ${className}`}
        >
            <img
                src={iconSrc}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                className='w-full h-full object-cover'
            />
        </div>
    )
}

export default PlaylistMetaData;