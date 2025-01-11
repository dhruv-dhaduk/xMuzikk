import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../components/ui/Spinner.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Feed from '../components/Feed.jsx';

import { getMusicDetails } from '../dataManager/index.js';

function MusicItemPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [musicItem, setMusicItem] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        getMusicDetails([id])
            .then((data) => {
                if (data && data.length > 0) {
                    setMusicItem(data[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className='flex justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    if (!musicItem) {
        return <NotFoundPage />;
    }

    return <Feed musicList={[musicItem]} />;
}

export default MusicItemPage;
