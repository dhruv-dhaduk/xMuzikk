import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import saveHollowIcon from '/icons/save_hollow.svg';
import saveFilledIcon from '/icons/save_filled.svg';
import defaultThumbnail from '/images/music_icon_neon_blue.jpeg';

import Spinner from './ui/Spinner.jsx';
import AsyncSubmitBtn from './AsyncSubmitBtn.jsx';

import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayerContext } from '../contexts/PlayerContext.js';
import { ToastContext } from '../contexts/ToastContext.js';

import { playlistService } from '../dataManager/AppwriteService.js';

function PlaylistMetaData({ playlist, user, isOwned, isRearranging, setIsRearranging, saveRearrangedItems }) {
    const { playManager } = useContext(PlayerContext);
    const { showToast } = useContext(ToastContext);
    const [playlistSavedStatus, setPlaylistSavedStatus] = useState(undefined);

    const navigate = useNavigate();

    const savePlaylist = useCallback(() => {
        if (!user)
            return;

        if (!playlist?.$id)
            return;

        setPlaylistSavedStatus(undefined);
        
        playlistService
            .savePlaylist(user.$id, playlist.$id)
            .then((response) => {
                setPlaylistSavedStatus(true);
                showToast.success('Playlist saved successfully');
            })
            .catch((err) => {
                console.error(err);
                showToast.error(err.message);
            });

    }, [setPlaylistSavedStatus, playlist, user]);

    const removeSavedPlaylist = useCallback(() => {
        if (!user)
            return;
        
        if (!playlist?.$id)
            return;

        setPlaylistSavedStatus(undefined);

        playlistService
            .removeSavedPlaylist(user.$id, playlist.$id)
            .then((response) => {
                setPlaylistSavedStatus(false);
                showToast.success('Playlist removed from saved playlists');
            })
            .catch((err) => {
                console.error(err);
                showToast.error(err.message);
            });

    }, [setPlaylistSavedStatus, playlist, user]);

    const deleteThisPlaylist = useCallback(async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this playlist ?');
        if (!isConfirmed)
            return;

        try {
            await playlistService.deletePlaylist(user.$id, playlist.$id);
            showToast.success('Playlist deleted successfully');
            navigate('/playlists/me');
        } catch (err) {
            showToast.error(err.message);
        }
    }, []);

    useEffect(() => {
        if (!user?.$id || !playlist?.$id)
            return;

        playlistService
            .isPlaylistSaved(user.$id, playlist.$id)
            .then((isPlaylistSaved) => {
                setPlaylistSavedStatus(isPlaylistSaved);
            })
            .catch((err) => {
                setPlaylistSavedStatus(false);
            });
    }, [playlist, user]);
    
    return (
        <div className='select-none'>
            <div className='aspect-square rounded-2xl overflow-hidden'>
                <img
                    src={playlist.thumbnail || defaultThumbnail}
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

                    {
                        (playlistSavedStatus === undefined || playlistSavedStatus === null) && (
                            <div className='flex justify-center items-center aspect-square w-14 rounded-full bg-white bg-opacity-15'>
                                <Spinner size={30} />
                            </div>
                        )
                    }
                    
                    {
                        playlistSavedStatus === true && (
                            <Icon   
                                iconSrc={saveFilledIcon}
                                onClick={removeSavedPlaylist}
                            />
                        )
                    }

                    {
                        playlistSavedStatus === false && (
                            <Icon
                                iconSrc={saveHollowIcon}
                                onClick={savePlaylist}
                            />
                        )
                    }

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

            {
                isOwned && (
                    (
                        isRearranging ? (
                            <div className='flex justify-between items-center gap-2 py-2 flex-wrap'>
                                <button
                                    className='flex-1 h-9 font-semibold rounded-lg bg-white text-black active:bg-opacity-80'
                                    onClick={() => setIsRearranging(false)}
                                >
                                    Cancel
                                </button>

                                <AsyncSubmitBtn
                                    className='flex-1 h-9 font-semibold rounded-lg bg-green-600 text-white active:bg-opacity-80'
                                    loadingClassName='flex-1 h-9 flex justify-center items-center bg-green-800 rounded-lg'
                                    spinnerSize={30}
                                    asyncClickHandler={saveRearrangedItems}
                                >
                                    Save
                                </AsyncSubmitBtn>
                            </div>
                        ) : (
                            <div className='flex justify-between items-center gap-2 py-2 flex-wrap'>
                                {
                                    playlist?.items?.length > 0 && (
                                        <button
                                            className='flex-1 h-9 font-semibold rounded-lg bg-white text-black active:bg-opacity-80'
                                            onClick={() => setIsRearranging(true)}
                                        >
                                            Rearrange items
                                        </button>
                                    )
                                }

                                <AsyncSubmitBtn
                                    className='flex-1 h-9 font-semibold rounded-lg bg-red-700 text-white active:bg-opacity-80'
                                    loadingClassName='flex-1 h-9 flex justify-center items-center bg-red-900 rounded-lg'
                                    spinnerSize={30}
                                    asyncClickHandler={deleteThisPlaylist}
                                >
                                    Delete playlist
                                </AsyncSubmitBtn>
                            </div>
                        )
                    )
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