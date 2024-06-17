import PlaylistFeedItem from './PlaylistFeedItem.jsx';
import Popover from '../ui/Popover.jsx';
import { useCallback, useEffect } from "react";
import { useState, useContext } from "react";
import { ToastContext } from '../../contexts/ToastContext.js';

import { authService, playlistService } from '../../dataManager/AppwriteService.js';

import Spinner from '../ui/Spinner.jsx';
import AuthLinks from '../AuthLinks.jsx';

import LoadingFeed from '../Loading.jsx';
import AsyncSubmitBtn from '../AsyncSubmitBtn.jsx';

const FETCH_AMOUNT = 10;

function OwnedPlaylists({ context, children }) {

    const [user, setUser] = useState(context?.user ? context.user : undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [ownedPlaylistDocumentIDs, setOwnedPlaylistDocumentIDs] = useState(undefined);
    const [ownedPlaylists, setOwnedPlaylists] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const fetchNextItems = useCallback(async (resetIndex = false) => {

        if (!ownedPlaylistDocumentIDs?.length)
            return;

        if (!resetIndex && !hasMoreItems)   
            return;

        if (!resetIndex && ownedPlaylistDocumentIDs?.length === ownedPlaylists?.length) {
            setHasMoreItems(false);
            return;
        }

        let itemsToFetch = [];
        if (context?.limit) {
            itemsToFetch = ownedPlaylistDocumentIDs.slice(0, context.limit);
        }
        else {
            if (resetIndex) {
                itemsToFetch = ownedPlaylistDocumentIDs.slice(0, FETCH_AMOUNT);
            }
            else {
                itemsToFetch = ownedPlaylistDocumentIDs.slice(ownedPlaylists.length, ownedPlaylists.length + FETCH_AMOUNT);
            }
        }

        const fetchedItems = await playlistService.fetchPlaylists(itemsToFetch);

        if (resetIndex) {
            setOwnedPlaylists(fetchedItems);
            setHasMoreItems(fetchNextItems.length === ownedPlaylistDocumentIDs.length);
        }
        else {
            setOwnedPlaylists([...ownedPlaylists, ...fetchedItems]);
            setHasMoreItems((ownedPlaylists.length + fetchedItems.length) === ownedPlaylistDocumentIDs.length);
        }

    }, [ownedPlaylistDocumentIDs, ownedPlaylists, setOwnedPlaylists, hasMoreItems, setHasMoreItems]);

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
        if (user) {
            return;
        }

        const fetchUser = async () => {
            const { response } = await authService.getAccountDetails();

            if (!response) {
                setUser(null);
            }
            else {
                setUser(response);
            }
        }

        fetchUser();
    }, [context]);

    useEffect(() => {
        if (user === undefined) {
            return;
        }
        else if (user === null) {
            setIsLoading(false);
            return;
        }

        playlistService
            .getOwnedPlaylists(user.$id, context?.limit ? context.limit : undefined)
            .then((response) => {
                setOwnedPlaylistDocumentIDs(response);

            })
            .catch((err) => {
                console.error(err);
                setOwnedPlaylistDocumentIDs(null);
            })
            .finally(() => {                
                setIsLoading(false);
            });

    }, [user, context]);

    useEffect(() => {
        if (!ownedPlaylistDocumentIDs?.length) {
            return;
        }

        fetchNextItems(true);
    }, [ownedPlaylistDocumentIDs, context]);

    useEffect(() => {
        if (!ownedPlaylists?.length || !hasMoreItems) {
            return;
        }

        window.addEventListener('scrollend', handleScrollToEnd);

        return () => {
            window.removeEventListener('scrollend', handleScrollToEnd);
        }
    }, [ownedPlaylists, hasMoreItems, context]);

    if (isLoading) {
        return (
            <div className='flex justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    if (user === null) {
        return <AuthLinks message='Please Login or Signup to see your playlists' />;
    }

    return (
        <div className='p-3 tablet:p-6'>
            <div className='rounded-xl bg-white bg-opacity-5 border border-white border-opacity-5'> 
                <p className='p-4 text-xl tablet:text-2xl text-center tablet:text-left font-bold select-none'>
                    Your Playlists
                </p>

                {
                    ownedPlaylistDocumentIDs === null && (
                        <div className='text-center p-8'>
                            An Error occured while fetching your playlists.
                        </div>
                    )
                }

                {
                    ownedPlaylistDocumentIDs.length === 0 && (
                        <div className='text-center p-8 text-sm'>
                            You don't have any playlists.
                        </div>
                    )
                }

                {
                    ownedPlaylistDocumentIDs?.length > 0 && (
                        !ownedPlaylists?.length ? (
                            <LoadingFeed count={context?.limit || 12} />
                        ) : (
                            <div>
                                <div className='grid grid-cols-1 tablet:grid-cols-feed gap-2 tablet:gap-6 p-2 tablet:p-3'>
                                    <OwnedPlaylistsFeed user={user} ownedPlaylists={ownedPlaylists} /> 
                                </div>
    
                                {
                                    hasMoreItems && (
                                        <div className='flex justify-center p-4'>
                                            <Spinner />
                                        </div>
                                    )
                                }
    
                                { children }
                            </div>
                        )
                    )
                
                }
                
            </div>
        </div>
    );
}

function OwnedPlaylistsFeed({ user, ownedPlaylists }) {
    const [popoverShowing, setPopoverShowing] = useState(false);
    const [popoverPlaylistDetails, setPopoverPlaylistDetails] = useState({});

    const { showToast } = useContext(ToastContext);

    return (
        <>
            {
                ownedPlaylists?.map(item => (
                    <PlaylistFeedItem
                        key={item.$id}
                        playlist={item}
                        showMoreOptions={() => { setPopoverShowing(true); setPopoverPlaylistDetails(item); }}
                    />
                ))
            }

            <Popover 
                popoverShowing={popoverShowing}
                setPopoverShowing={setPopoverShowing}
                className='backdrop:bg-black backdrop:opacity-80 w-72 max-w-[90%] max-h-[90%] p-4 bg-black text-white border border-white border-opacity-30 rounded-2xl'
            >
                <p>
                    { popoverPlaylistDetails.title }
                </p>

                <PopoverBtn
                    onClick={() => { 
                        navigator.share({
                            title: popoverPlaylistDetails.title,
                            text: `${window.location.origin}/playlist/${popoverPlaylistDetails.$id}`
                        });

                        setPopoverShowing(false);
                    }}
                >
                    Share
                </PopoverBtn>

                {
                    popoverPlaylistDetails.ytId && (
                        <PopoverBtn
                            onClick={() => {
                                window.open(`https://www.youtube.com/playlist?list=${popoverPlaylistDetails.ytId}`, '_blank');
                                setPopoverShowing(false);
                            }}
                        >
                            Open in YouTube
                        </PopoverBtn>
                    )
                }

                <AsyncSubmitBtn
                    className='w-full h-9 mt-4 bg-red-700 text-white text-[15px] font-semibold rounded-full active:scale-90 duration-200'
                    loadingClassName='w-full h-9 mt-4 flex justify-center items-center bg-red-950  rounded-full'
                    spinnerSize={20}
                    asyncClickHandler={async () => {
                        try {
                            await playlistService.deletePlaylist(user.$id, popoverPlaylistDetails.$id);
                            showToast.success('Playlist deleted successfully.');
                        } catch (err) {
                            console.error(err);
                            showToast.error(err.message);
                        }

                        setPopoverShowing(false);
                    }}
                >
                    Delete
                </AsyncSubmitBtn>
            
                <button
                    onClick={() => setPopoverShowing(false)}
                    className='w-full h-9 mt-4 bg-white text-black text-[17px] font-bold rounded-full active:bg-opacity-80'
                >
                    Cancel
                </button>

            </Popover>
        </>
    )
}

function PopoverBtn({ onClick, className, children }) {
    return (
        <button
            onClick={onClick}
            className={`w-full h-9 mt-4 bg-[#101010] text-white text-[15px] font-semibold rounded-full border border-white border-opacity-20 active:scale-90 duration-200 ${className}`}
        >
            { children }
        </button>
    )
}

export default OwnedPlaylists;