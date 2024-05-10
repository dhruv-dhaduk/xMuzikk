import FeedItem from "./FeedItem";
import { PlayerContext } from '../contexts/PlayerContext.js';
import { useContext } from "react";

import LoadingFeed from "./Loading.jsx";

function Feed({ musicList }) {
    const playerContext = useContext(PlayerContext);

    if (!musicList || !musicList.length) {
        return <LoadingFeed count={12} />
    }

    return (
        <div className='grid grid-cols-1 tablet:grid-cols-feed tablet:gap-x-6 target:gap-y-12 tablet:p-6'>
            {
                musicList.map(item => <FeedItem key={item.id} music={item} isPlaying={item.id === playerContext?.playingMusic?.id} onClick={() => playerContext.playMusic(item)} />)
            }
        </div>
    );
}

export default Feed;