import { useCallback, useEffect } from "react";
import { useState } from "react";

import { authService, appwriteService } from '../../dataManager/AppwriteService.js';

import Spinner from '../ui/Spinner.jsx';
import AuthLinks from '../AuthLinks.jsx';

const FETCH_AMOUNT = 10;

function SavedPlaylists({ context }) {

    const [user, setUser] = useState(context?.user ? context.user : undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [savedPlaylistDocumentIDs, setSavedPlaylistDocumentIDs] = useState(undefined);
    const [savedPlaylists, setSavedPlaylists] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const fetchNextItems = useCallback(async (resetIndex = false) => {

        if (!savedPlaylistDocumentIDs?.length)
            return;

        if (!resetIndex && !hasMoreItems)   
            return;

        if (!resetIndex && savedPlaylistDocumentIDs?.length === savedPlaylists?.length) {
            setHasMoreItems(false);
            return;
        }

        let itemsToFetch = [];
        if (context?.limit) {
            itemsToFetch = savedPlaylistDocumentIDs.slice(0, context.limit);
        }
        else {
            if (resetIndex) {
                itemsToFetch = savedPlaylistDocumentIDs.slice(0, FETCH_AMOUNT);
            }
            else {
                itemsToFetch = savedPlaylistDocumentIDs.slice(savedPlaylists.length, savedPlaylists.length + FETCH_AMOUNT);
            }
        }

        const fetchedItems = await appwriteService.fetchPlaylists(itemsToFetch);

        if (resetIndex) {
            setSavedPlaylists(fetchedItems);
        }
        else {
            setSavedPlaylists([...savedPlaylists, ...fetchedItems]);
        }

    }, [savedPlaylistDocumentIDs, savedPlaylists, setSavedPlaylists, hasMoreItems, setHasMoreItems]);

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

        appwriteService
            .getSavedPlaylists(user.$id, context?.limit ? context.limit : undefined)
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

    }, [user, context]);

    useEffect(() => {
        if (!savedPlaylistDocumentIDs?.length) {
            return;
        }

        fetchNextItems(true);
    }, [savedPlaylistDocumentIDs, context]);

    useEffect(() => {
        if (!savedPlaylists?.length || !hasMoreItems) {
            return;
        }

        window.addEventListener('scrollend', handleScrollToEnd);

        return () => {
            window.removeEventListener('scrollend', handleScrollToEnd);
        }
    }, [savedPlaylists, hasMoreItems, context]);

    if (isLoading) {
        return (
            <div className='flex justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    if (user === null) {
        return <AuthLinks message='Please Login or Signup to see your saved playlists' />;
    }

    if (savedPlaylistDocumentIDs === null) {
        return (
            <div className='text-center p-4'>
                An Error occured while fetching your saved playlists.
            </div>
        );
    }

    if (savedPlaylistDocumentIDs.length === 0) {
        return (
            <div className='text-center p-4'>
                You have no saved playlists.
            </div>
        );
    }

    return (
        <div>
            <p>
                Playlists Saved IDs : { JSON.stringify(savedPlaylistDocumentIDs) }
            </p>
            <p>
                Playlists Saved :
            </p>
            
            {
                savedPlaylists?.map(item => 
                    <p key={item.$id} className='p-4'>
                        { JSON.stringify(item) }
                    </p>
                )
            }
        </div>
    );
}

export default SavedPlaylists;