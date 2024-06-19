import { useCallback, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { playlistService } from '../dataManager/AppwriteService.js';
import { getMusicDetails } from '../dataManager/index.js';
import { UserContext } from '../contexts/UserContext.js';
import { DragDropCallbackContext } from '../contexts/DragDropCallbackContext.js';
import { ToastContext } from '../contexts/ToastContext.js';

import PlaylistMetaData from '../components/PlaylistMetaData.jsx';
import PlaylistFeed, { PlaylistFeedRearrange } from '../components/PlaylistFeed.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import AuthLinks from '../components/AuthLinks.jsx';

const FETCH_AMOUNT = 10;

function PlaylistPage() {
    const { documentId } = useParams();
    
    const { user } = useContext(UserContext);
    const { setDragDropCallback } = useContext(DragDropCallbackContext);
    const { showToast } = useContext(ToastContext);
    
    const [playlist, setPlaylist] = useState({});
    const [playlistItems, setPlaylistItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwned, setIsOwned] = useState(false);
    const [isRearranging, setIsRearranging] = useState(false);
    const [rearrangableItems, setRearrangableItems] = useState([]);

    const handleOnDragEnd = useCallback((result) => {
        
        const from = result.source.index;
        const to = result.destination.index;

        const newItems = Array.from(rearrangableItems);
        const [item] = newItems.splice(from, 1);
        newItems.splice(to, 0, item);

        setRearrangableItems(newItems);

    }, [rearrangableItems, setRearrangableItems]);

    const fetchCurrentPlaylist = useCallback(async (reload = false) => {
        if (!user)
            return;

        if (reload) {
            setIsLoading(true);
            setPlaylist({});
            setPlaylistItems([]);
        }
        setHasMoreItems(true);

        playlistService.fetchPlaylist(documentId)
            .then((response) => {
                setPlaylist(response);
            })
            .catch((err) => {
                setPlaylist({ notFound: true });
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [user, setIsLoading, setPlaylist, setPlaylistItems, setHasMoreItems]);

    const fetchNextItems = useCallback(async (reset = false, fetchAmount = FETCH_AMOUNT) => {
        if (!hasMoreItems) {
            return;
        }

        if (playlist?.items?.length === playlistItems.length) {
            setHasMoreItems(false);
            return;
        }

        let itemsToFetch;

        if (reset) {
            itemsToFetch = playlist.items.slice(0, fetchAmount);
        }
        else {
            itemsToFetch = playlist.items.slice(playlistItems.length, playlistItems.length + fetchAmount);
        }
        

        const nextItems = await getMusicDetails(itemsToFetch);

        if (reset) {
            setPlaylistItems(nextItems);
            setHasMoreItems(nextItems.length !== playlist.items.length);
        }
        else {
            setPlaylistItems([...playlistItems, ...nextItems]);
            setHasMoreItems((playlistItems.length, nextItems.length) !== playlist.items.length);
        }

    }, [playlist, playlistItems, setPlaylistItems, hasMoreItems, setHasMoreItems]);

    const saveRearrangedItems = useCallback(async () => {
        const rearrangedIDs = rearrangableItems.map(item => item.id);

        try {
            const response = await playlistService.rearrangePlaylistItems(playlist.$id, rearrangedIDs);

            const newPlaylistItems = await getMusicDetails(response.items.slice(0, rearrangedIDs.length), false, rearrangableItems);

            setPlaylist(response);
            setPlaylistItems(newPlaylistItems);
            setHasMoreItems(true);

            showToast.success('Playlist rearranged successfully');
        } catch (err) {
            console.error(err);
            showToast.error(err.message);
        }
        finally {
            setIsRearranging(false);
        }

    }, [rearrangableItems, playlist, setPlaylist, setPlaylistItems, setHasMoreItems, setIsRearranging]);

    const handleScrollToEnd = useCallback(async () => {
        const scrollRemaining = document.body.offsetHeight - window.scrollY - window.innerHeight;

        if (scrollRemaining <= 0) {
            const scrollY = window.scrollY;
            window.removeEventListener('scrollend', handleScrollToEnd);
            await fetchNextItems();
            window.scrollTo(0, scrollY);
        }
    }, [fetchNextItems]);

    useEffect(() => {
        if (!user)
            return;

        playlistService.fetchPlaylist(documentId)
            .then((response) => {
                setPlaylist(response);
            })
            .catch((err) => {
                setPlaylist({ notFound: true });
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [user]);

    useEffect(() => {
        if (!playlist || !playlist?.items?.length || playlist.notFound) {
            return;
        }

        fetchNextItems(true, playlistItems?.length ? playlistItems.length : undefined);
    }, [playlist]);

    useEffect(() => {
        if (!playlistItems.length || !hasMoreItems) {
            return;
        }

        if (!isRearranging) {
            window.addEventListener('scrollend', handleScrollToEnd);
        }

        return () => {
            window.removeEventListener('scrollend', handleScrollToEnd);
        }
    }, [playlistItems, hasMoreItems, isRearranging]);

    useEffect(() => {
        playlistService
            .isPlaylistOwned(user?.$id, documentId)
            .then((ans) => {
                setIsOwned(ans);
            })
    }, [documentId, user]);

    useEffect(() => {
        if (isRearranging) {
            setRearrangableItems(playlistItems);
        }
        else {
            setRearrangableItems([]);
        }
    }, [isRearranging]);

    useEffect(() => {
        setDragDropCallback('playlist', handleOnDragEnd);
    }, [handleOnDragEnd]);


    if (isLoading) {
        return (
            <div className='flex justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    if (user === null) {
        return <AuthLinks message='Please Login or Signup to view playlists' />;
    }

    if (playlist.notFound) {
        return (
            <div className='w-full pt-56'>
            <p className='text-8xl text-center select-none'>
                404
            </p>
            <p className='text-5xl text-center select-none'>
                Not Found
            </p>
            <p className='mt-4 text-center select-none'>
                (Or maybe your are not logged in)
            </p>
        </div>
        );
    }
    
    return (
        <div className='laptop:flex laptop:justify-center laptop:items-start laptop:px-6'>
            <div className='flex-1 laptop:max-w-[25rem] laptop:sticky top-header-height p-4 tablet:p-6'>
                <PlaylistMetaData
                    playlist={playlist}
                    user={user}
                    isOwned={isOwned}
                    isRearranging={isRearranging}
                    setIsRearranging={setIsRearranging}
                    saveRearrangedItems={saveRearrangedItems}
                />
            </div>

            <div className='flex-1 laptop:max-w-[60rem] tablet:py-6'>
                {
                    !playlist?.items?.length ? (
                        <p className='font-bold text-2xl text-center p-4'>
                            This playlist is empty
                        </p>
                    ) : (
                        <>
                            {
                                isRearranging ? (
                                    <PlaylistFeedRearrange 
                                        playlistItems={rearrangableItems}
                                    />
                                ) : (
                                    <PlaylistFeed
                                        playlist={playlist}
                                        playlistItems={playlistItems}
                                        isOwned={isOwned}
                                        reloader={fetchCurrentPlaylist}
                                    />
                                )
                            }
            
                            {
                                hasMoreItems && (
                                    <div className='flex justify-center pb-4'>
                                        <Spinner />
                                    </div>
                                )
                            }

                        </>
                    )
                }

                
            </div>
        </div>
    );
}

export default PlaylistPage;