import { useEffect, useState, useContext, useCallback } from 'react';
import { playlistService } from '../dataManager/AppwriteService.js';
import { UserContext } from '../contexts/UserContext.js';
import { ToastContext } from '../contexts/ToastContext.js';

import AsyncSubmitBtn from './AsyncSubmitBtn.jsx';

function AddToPlaylist({ music, callback }) {
    const [userPlaylists, setUserPlaylists] = useState([]);
    const { user } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);

    const handleAddToPlaylist = useCallback(
        async (playlist) => {
            try {
                const response = await playlistService.addToPlaylist(
                    playlist?.$id,
                    music?.id
                );

                showToast.success('Music Added to playlist successfully');
            } catch (err) {
                console.error(err);
                showToast.error(err.message);
            }

            callback();
        },
        [music]
    );

    useEffect(() => {
        if (!user) return;

        const getUserPlaylists = async () => {
            const playlistsDocumentIDs =
                await playlistService.getOwnedPlaylists(user?.$id);
            const playlists = await playlistService.fetchPlaylists(
                playlistsDocumentIDs,
                ['$id', 'title']
            );
            setUserPlaylists(playlists);
        };

        getUserPlaylists();
    }, [user]);

    if (!userPlaylists?.length) return null;

    return (
        <div className='w-full mt-4 p-2 rounded-lg bg-[#101010] border border-white border-opacity-20'>
            <p className='mb-2 font-semibold'>Add to playlist</p>

            <div className='w-full max-h-48 px-2 overflow-y-auto'>
                {userPlaylists.map((playlist) => {
                    if (playlist.notFound) return null;

                    return (
                        <AsyncSubmitBtn
                            key={playlist.$id}
                            className='w-full h-7 my-2 flex justify-center items-center rounded-md bg-[#1e1e1e] border border-white border-opacity-10 active:scale-90 duration-200'
                            loadingClassName='w-full h-7 my-2 flex justify-center items-center rounded-md bg-[#1e1e1e] border border-white border-opacity-10'
                            spinnerSize={20}
                            asyncClickHandler={async () => {
                                await handleAddToPlaylist(playlist);
                            }}
                        >
                            <span className='text-xs line-clamp-1 break-all'>
                                {playlist.title}
                            </span>
                        </AsyncSubmitBtn>
                    );
                })}
            </div>
        </div>
    );
}

export default AddToPlaylist;
