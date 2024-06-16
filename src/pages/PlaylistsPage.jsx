import { useEffect, useState } from "react";

import { authService } from '../dataManager/AppwriteService.js';

import Spinner from '../components/ui/Spinner.jsx';
import AuthLinks from '../components/AuthLinks.jsx';

import PlaylistFeedItem from '../components/playlist/PlaylistFeedItem.jsx';

function PlaylistsPage() {

    // const [user, setUser] = useState(undefined);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const { response } = await authService.getAccountDetails();

    //         if (!response) {
    //             setUser(null);
    //         }
    //         else {
    //             setUser(response);
    //         }
    //         setIsLoading(false);
    //     }

    //     fetchUser();
    // }, []);

    // if (isLoading) {
    //     return (
    //         <div className='flex justify-center p-4'>
    //             <Spinner />
    //         </div>
    //     );
    // }

    // if (user === null) {
    //     return <AuthLinks message='Please Login or Signup to view playlists' />;
    // }

    // return (
    //     <div className='w-full pt-56'>
    //         <p className='text-5xl text-center select-none'>
    //             Coming Soon
    //         </p>
    //     </div>
    // );

    return (
        <div className='grid grid-cols-1 tablet:grid-cols-feed gap-2 tablet:gap-6 p-3 tablet:p-6'>
            <PlaylistFeedItem />
            <PlaylistFeedItem />
            <PlaylistFeedItem />
            <PlaylistFeedItem />
            <PlaylistFeedItem />
            <PlaylistFeedItem />
        </div>
    );
}

export default PlaylistsPage;