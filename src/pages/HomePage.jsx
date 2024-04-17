import { useState } from 'react';
import Feed from '../components/Feed';

import { Recommendation } from '../dataManager';
const recmnd = new Recommendation();
recmnd.init();

function HomePage() {

    const [musicList, setMusicList] = useState([]);

    const getMoreData = async () => {
        const data = await recmnd.getNextMusicDetails(5);
        setMusicList([...musicList, ...data]);
    }

    return (
        <div>
            <p>xMuzikk Home Page</p>

            <Feed musicList={musicList} />

            <button 
                className='bg-white text-black font-bold rounded p-4'
                onClick={() => console.log(recmnd.data)}
            >
                Print All IDs
            </button>
            <button 
                className='bg-white text-black font-bold rounded p-4'
                onClick={getMoreData}
            >
                Get More Data   
            </button>

        </div>
    );
}

export default HomePage;