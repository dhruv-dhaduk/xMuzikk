import { useCallback, useEffect } from 'react';
import { useState, useContext } from 'react';
import { ToastContext } from '../../contexts/ToastContext.js';
import { UserContext } from '../../contexts/UserContext.js';

import { playlistService } from '../../dataManager/AppwriteService.js';

import Spinner from '../ui/Spinner.jsx';
import AuthLinks from '../AuthLinks.jsx';

import PlaylistFeedItem from './PlaylistFeedItem.jsx';
import LoadingFeed from '../Loading.jsx';
import Popover from '../ui/Popover.jsx';
import AsyncSubmitBtn from '../AsyncSubmitBtn.jsx';

const FETCH_AMOUNT = 10;

function SavedPlaylists({ children, limit }) {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [savedPlaylistDocumentIDs, setSavedPlaylistDocumentIDs] =
        useState(undefined);
    const [savedPlaylists, setSavedPlaylists] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const fetchSavedPlaylistDocumentIDs = useCallback(() => {
        if (user === undefined) {
            return;
        } else if (user === null) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setSavedPlaylistDocumentIDs(undefined);
        setSavedPlaylists([]);
        setHasMoreItems(true);

        playlistService
            .getSavedPlaylists(user.$id, limit ? limit : undefined)
            .then((response) => {
                setSavedPlaylistDocumentIDs(response);
            })
            .catch((err) => {
                console.error(err);
                setSavedPlaylistDocumentIDs(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [
        user,
        limit,
        setSavedPlaylistDocumentIDs,
        setIsLoading,
        setSavedPlaylists,
        setHasMoreItems,
    ]);

    const fetchNextItems = useCallback(
        async (resetIndex = false) => {
            if (!savedPlaylistDocumentIDs?.length) return;

            if (!resetIndex && !hasMoreItems) return;

            if (
                !resetIndex &&
                savedPlaylistDocumentIDs?.length === savedPlaylists?.length
            ) {
                setHasMoreItems(false);
                return;
            }

            let itemsToFetch = [];
            if (limit) {
                itemsToFetch = savedPlaylistDocumentIDs.slice(0, limit);
            } else {
                if (resetIndex) {
                    itemsToFetch = savedPlaylistDocumentIDs.slice(
                        0,
                        FETCH_AMOUNT
                    );
                } else {
                    itemsToFetch = savedPlaylistDocumentIDs.slice(
                        savedPlaylists.length,
                        savedPlaylists.length + FETCH_AMOUNT
                    );
                }
            }

            const fetchedItems =
                await playlistService.fetchPlaylists(itemsToFetch);

            if (resetIndex) {
                setSavedPlaylists(fetchedItems);
                setHasMoreItems(
                    fetchNextItems.length === savedPlaylistDocumentIDs.length
                );
            } else {
                setSavedPlaylists([...savedPlaylists, ...fetchedItems]);
                setHasMoreItems(
                    savedPlaylists.length + fetchedItems.length ===
                        savedPlaylistDocumentIDs.length
                );
            }
        },
        [
            savedPlaylistDocumentIDs,
            savedPlaylists,
            setSavedPlaylists,
            hasMoreItems,
            setHasMoreItems,
        ]
    );

    const handleScrollToEnd = useCallback(async () => {
        const scrollRemaining =
            document.body.offsetHeight - window.scrollY - window.innerHeight;

        if (scrollRemaining <= 0) {
            const scrollY = window.scrollY;
            window.removeEventListener('scrollend', handleScrollToEnd);
            await fetchNextItems();
            window.scrollTo(0, scrollY);
        }
    }, [fetchNextItems]);

    useEffect(fetchSavedPlaylistDocumentIDs, [user, limit]);

    useEffect(() => {
        if (!savedPlaylistDocumentIDs?.length) {
            return;
        }

        fetchNextItems(true);
    }, [savedPlaylistDocumentIDs, limit]);

    useEffect(() => {
        if (!savedPlaylists?.length || !hasMoreItems) {
            return;
        }

        window.addEventListener('scrollend', handleScrollToEnd);

        return () => {
            window.removeEventListener('scrollend', handleScrollToEnd);
        };
    }, [savedPlaylists, hasMoreItems, limit]);

    if (isLoading) {
        return (
            <div className='flex justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    if (user === null) {
        return (
            <AuthLinks message='Please Login or Signup to see your saved playlists' />
        );
    }

    return (
        <div className='p-3 tablet:p-6'>
            <div className='rounded-xl bg-white bg-opacity-5 border border-white border-opacity-5'>
                <p className='p-4 text-xl tablet:text-2xl text-center tablet:text-left font-bold select-none'>
                    Your Saved Playlists
                </p>

                {savedPlaylistDocumentIDs === null && (
                    <div className='text-center p-8'>
                        An Error occured while fetching your saved playlists.
                    </div>
                )}

                {savedPlaylistDocumentIDs.length === 0 && (
                    <div className='text-center p-8 text-sm'>
                        You have no saved playlists.
                    </div>
                )}

                {savedPlaylistDocumentIDs?.length > 0 &&
                    (!savedPlaylists?.length ? (
                        <LoadingFeed count={limit || 12} />
                    ) : (
                        <div>
                            <div className='grid grid-cols-1 tablet:grid-cols-feed gap-2 tablet:gap-6 p-2 tablet:p-3'>
                                <SavedPlaylistsFeed
                                    savedPlaylists={savedPlaylists}
                                    user={user}
                                    fetchSavedPlaylistDocumentIDs={
                                        fetchSavedPlaylistDocumentIDs
                                    }
                                />
                            </div>

                            {hasMoreItems && (
                                <div className='flex justify-center p-4'>
                                    <Spinner />
                                </div>
                            )}

                            {children}
                        </div>
                    ))}
            </div>
        </div>
    );
}

function SavedPlaylistsFeed({
    savedPlaylists,
    user,
    fetchSavedPlaylistDocumentIDs,
}) {
    const [popoverShowing, setPopoverShowing] = useState(false);
    const [popoverPlaylistDetails, setPopoverPlaylistDetails] = useState({});

    const { showToast } = useContext(ToastContext);

    return (
        <>
            {savedPlaylists?.map((item) => (
                <PlaylistFeedItem
                    key={item.$id}
                    playlist={item}
                    showMoreOptions={() => {
                        setPopoverShowing(true);
                        setPopoverPlaylistDetails(item);
                    }}
                />
            ))}

            <Popover
                popoverShowing={popoverShowing}
                setPopoverShowing={setPopoverShowing}
                className='backdrop:bg-black backdrop:opacity-80 w-72 max-w-[90%] max-h-[90%] p-4 bg-black text-white border border-white border-opacity-30 rounded-2xl'
            >
                <p>{popoverPlaylistDetails.title}</p>

                <PopoverBtn
                    onClick={() => {
                        navigator.share({
                            title: popoverPlaylistDetails.title,
                            text: `${window.location.origin}/playlist/${popoverPlaylistDetails.$id}`,
                        });

                        setPopoverShowing(false);
                    }}
                >
                    Share
                </PopoverBtn>

                {popoverPlaylistDetails.ytId && (
                    <PopoverBtn
                        onClick={() => {
                            window.open(
                                `https://www.youtube.com/playlist?list=${popoverPlaylistDetails.ytId}`,
                                '_blank'
                            );
                            setPopoverShowing(false);
                        }}
                    >
                        Open in YouTube
                    </PopoverBtn>
                )}

                <AsyncSubmitBtn
                    className='w-full h-9 mt-4 bg-red-700 text-white text-[15px] font-semibold rounded-full active:scale-90 duration-200'
                    loadingClassName='w-full h-9 mt-4 flex justify-center items-center bg-red-950  rounded-full'
                    spinnerSize={20}
                    asyncClickHandler={async () => {
                        try {
                            await playlistService.removeSavedPlaylist(
                                user.$id,
                                popoverPlaylistDetails.$id
                            );
                            showToast.success(
                                'Playlist removed from saved playlists'
                            );
                        } catch (err) {
                            console.error(err);
                            showToast.error(err.message);
                        }

                        setPopoverShowing(false);

                        fetchSavedPlaylistDocumentIDs();
                    }}
                >
                    Unsave
                </AsyncSubmitBtn>

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

function PopoverBtn({ onClick, className, children }) {
    return (
        <button
            onClick={onClick}
            className={`w-full h-9 mt-4 bg-[#101010] text-white text-[15px] font-semibold rounded-full border border-white border-opacity-20 active:scale-90 duration-200 ${className}`}
        >
            {children}
        </button>
    );
}

export default SavedPlaylists;
