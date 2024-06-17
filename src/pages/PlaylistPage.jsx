import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { playlistService, authService } from '../dataManager/AppwriteService.js';
import { getMusicDetails } from '../dataManager/index.js';

import PlaylistMetaData from '../components/PlaylistMetaData.jsx';
import PlaylistFeed from '../components/PlaylistFeed.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import AuthLinks from '../components/AuthLinks.jsx';

const FETCH_AMOUNT = 10;

function PlaylistPage() {
    const { documentId } = useParams();
    const [user, setUser] = useState(undefined);
    
    const [playlist, setPlaylist] = useState({});
    const [playlistItems, setPlaylistItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNextItems = useCallback(async () => {
        if (!hasMoreItems) {
            return;
        }

        if (playlist?.items?.length === playlistItems.length) {
            setHasMoreItems(false);
            return;
        }

        const itemsToFetch = playlist.items.slice(playlistItems.length, playlistItems.length + FETCH_AMOUNT);

        const nextItems = await getMusicDetails(itemsToFetch);

        setPlaylistItems([...playlistItems, ...nextItems]);

    }, [playlist, playlistItems, setPlaylistItems, hasMoreItems, setHasMoreItems]);

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
        const fetchUser = async () => {
            const { response } = await authService.getAccountDetails();

            if (!response) {
                setIsLoading(false);
                setUser(null);
            }
            else {
                setUser(response);
            }
        }

        fetchUser();
    }, [documentId]);

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

        fetchNextItems();
    }, [playlist]);

    useEffect(() => {
        if (!playlistItems.length || !hasMoreItems) {
            return;
        }

        window.addEventListener('scrollend', handleScrollToEnd);

        return () => {
            window.removeEventListener('scrollend', handleScrollToEnd);
        }
    }, [playlistItems, hasMoreItems]);


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
            <div className='flex-1 laptop:max-w-[28rem] laptop:sticky top-header-height p-4 tablet:p-6'>
                <PlaylistMetaData playlist={playlist} user={user} />
            </div>

            <div className='flex-1 laptop:max-w-[60rem] tablet:py-6'>
                <PlaylistFeed playlistItems={playlistItems} />

                {
                    hasMoreItems && (
                        <div className='flex justify-center pb-4'>
                            <Spinner />
                        </div>
                    )
                }
                
            </div>
        </div>
    );
}

export default PlaylistPage;