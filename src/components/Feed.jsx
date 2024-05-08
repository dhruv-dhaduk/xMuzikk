import FeedItem from "./FeedItem";
import { PlayerContext } from '../contexts/PlayerContext.js';
import { useContext } from "react";

function Feed({ musicList }) {
    const playerContext = useContext(PlayerContext);

    return (
        <div className='grid grid-cols-1 tablet:grid-cols-feed tablet:gap-x-6 target:gap-y-12 tablet:p-6'>
            {
                musicList.map(item => <FeedItem key={item.id} music={item} onClick={() => playerContext.playMusic(item.id)} />)
            }
        </div>
    );
}

export default Feed;