import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { appwriteService } from '../dataManager/AppwriteService.js';
import { getMusicDetails } from '../dataManager/index.js';

import PlaylistMetaData from '../components/PlaylistMetaData.jsx';
import PlaylistFeed from '../components/PlaylistFeed.jsx';
import Spinner from '../components/ui/Spinner.jsx';

const FETCH_AMOUNT = 10;

function PlaylistPage() {
    const { documentId } = useParams();
    const [playlist, setPlaylist] = useState({});
    const [playlistItems, setPlaylistItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNextItems = useCallback(async () => {
        if (!hasMoreItems) {
            return;
        }

        if (!playlist?.items?.length === playlistItems.length) {
            setHasMoreItems(false);
            return;
        }

        const itemsToFetch = playlist.items.slice(playlistItems.length, playlistItems.length + FETCH_AMOUNT);

        const nextItems = await getMusicDetails(itemsToFetch);

        setPlaylistItems([...playlistItems, ...nextItems]);

    }, [playlist, playlistItems, setPlaylistItems, hasMoreItems, setHasMoreItems]);

    useEffect(() => {
        appwriteService.fetchPlaylist(documentId)
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
    }, [documentId]);

    useEffect(() => {
        if (!playlist || playlist.notFound) {
            return;
        }

        fetchNextItems();
    }, [playlist]);


    if (isLoading) {
        return (
            <div className='flex justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    if (playlist.notFound) {
        return (
            <div className='flex justify-center p-4'>
                <p>Playlist not found</p>
            </div>
        );
    }

    window.fetchNextItems = fetchNextItems;
    
    return (
        <div className='laptop:flex laptop:justify-center laptop:items-start'>
            <div className='flex-1 laptop:max-w-[30rem] laptop:sticky top-header-height p-4 tablet:p-6'>
                <PlaylistMetaData playlist={playlist} />
            </div>

            <div className='flex-1 laptop:max-w-[60rem] tablet:py-6'>
                <PlaylistFeed playlistItems={playlistItems} />
            </div>
        </div>
    );
}

export default PlaylistPage;