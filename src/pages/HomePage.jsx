import { useState, useEffect } from 'react';
import Feed from '../components/Feed';
import LoadingFeed from '../components/Loading.jsx';

import { Recommendation } from '../dataManager';
const recmnd = new Recommendation();

const FETCH_AMOUNT = 10;

function HomePage() {

    const [musicList, setMusicList] = useState([]);
    const [isMoreMusic, setIsMoreMusic] = useState(true);

    const getMoreData = async () => {
        recmnd.resetFetchingIndex(musicList.length);
        const data = await recmnd.getNextMusicDetails(FETCH_AMOUNT);
        if (!data.length)
            setIsMoreMusic(false);
        setMusicList([...musicList, ...data]);
    }

    const handleScrollToEnd = async () => {
        const scrollRemaining = document.body.offsetHeight - window.scrollY - window.innerHeight;

        if (scrollRemaining <= 0) {
            const scrollY = window.scrollY;
            window.removeEventListener('scrollend', handleScrollToEnd);
            await getMoreData();
            window.scrollTo(0, scrollY);
        }
    }

    useEffect(() => {
        if (musicList.length)
            return;

        if (!recmnd.data.length) {
            recmnd.init()
            .then(() => {
                getMoreData()
            });
        }
        else {
            recmnd.resetFetchingIndex();
            getMoreData();
        }
    }, []);

    useEffect(() => {
        if (!musicList.length)
            return;

        window.addEventListener('scrollend', handleScrollToEnd);

        return () => {
            window.removeEventListener('scrollend', handleScrollToEnd);
        };
    });

    return (
        <div>

            {
                !musicList || !musicList.length ? <LoadingFeed count={12} /> : <Feed musicList={musicList} />
            }

            <p> { isMoreMusic ? "Fetching more." : "No more music" }</p>

        </div>
    );
}

export default HomePage;