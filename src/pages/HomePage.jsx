import AuthLinks from '../components/AuthLinks.jsx';

import { useState, useEffect, useContext } from 'react';
import Feed from '../components/Feed';
import LoadingFeed from '../components/Loading.jsx';
import Spinner from '../components/ui/Spinner.jsx';

import { UserContext } from '../contexts/UserContext.js';

import { Recommendation } from '../dataManager';
const recmnd = new Recommendation();

const FETCH_AMOUNT = 10;

function HomePage() {
    const [musicList, setMusicList] = useState([]);
    const [isMoreMusic, setIsMoreMusic] = useState(true);

    const { user } = useContext(UserContext);

    const getMoreData = async () => {
        recmnd.resetFetchingIndex(musicList.length);
        const data = await recmnd.getNextMusicDetails(FETCH_AMOUNT);
        if (!data.length) setIsMoreMusic(false);
        setMusicList([...musicList, ...data]);
    };

    const handleScrollToEnd = async () => {
        const scrollRemaining =
            document.body.offsetHeight - window.scrollY - window.innerHeight;

        if (scrollRemaining <= 0) {
            const scrollY = window.scrollY;
            window.removeEventListener('scrollend', handleScrollToEnd);
            await getMoreData();
            window.scrollTo(0, scrollY);
        }
    };

    useEffect(() => {
        if (musicList.length) return;

        if (!recmnd.data.length) {
            recmnd.init().then(() => {
                getMoreData();
            });
        } else {
            recmnd.resetFetchingIndex();
            getMoreData();
        }
    }, []);

    useEffect(() => {
        if (!musicList.length) return;

        window.addEventListener('scrollend', handleScrollToEnd);

        return () => {
            window.removeEventListener('scrollend', handleScrollToEnd);
        };
    });

    return (
        <div>
            {user === null && (
                <AuthLinks message='Please login or signup to enable more features' />
            )}

            {!musicList || !musicList.length ? (
                <LoadingFeed count={12} />
            ) : (
                <Feed musicList={musicList} />
            )}

            <div className='flex justify-center items-center border-t border-stone-700'>
                <div className='p-4 text-stone-300 text-lg font-bold'>
                    {isMoreMusic ? <Spinner /> : 'No more music'}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
