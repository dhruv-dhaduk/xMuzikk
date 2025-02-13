import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext.js';

import Spinner from '../components/ui/Spinner.jsx';
import AuthLinks from '../components/AuthLinks.jsx';
import SavedPlaylists from '../components/playlist/SavedPlaylists.jsx';
import CreatePlaylist from '../components/CreatePlaylist.jsx';
import OwnedPlaylists from '../components/playlist/OwnedPlaylists.jsx';

function PlaylistsPage() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user === undefined) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [user]);

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

    return (
        <div>
            <CreatePlaylist user={user} />

            <OwnedPlaylists limit={3}>
                <div className='flex justify-end p-3'>
                    <Link
                        to='/playlists/me'
                        className='px-3 py-1 rounded-md text-xs font-bold bg-white bg-opacity-90 text-black select-none'
                    >
                        Show all
                    </Link>
                </div>
            </OwnedPlaylists>

            <SavedPlaylists limit={3}>
                <div className='flex justify-end p-3'>
                    <Link
                        to='/playlists/saved'
                        className='px-3 py-1 rounded-md text-xs font-bold bg-white bg-opacity-90 text-black select-none'
                    >
                        Show all
                    </Link>
                </div>
            </SavedPlaylists>
        </div>
    );
}

export default PlaylistsPage;
