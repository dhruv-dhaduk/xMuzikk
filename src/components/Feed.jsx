import FeedItem from "./FeedItem";

function Feed({ musicList }) {
    return (
        <div>
            {
                musicList.map(item => <FeedItem key={item.id} music={item} />)
            }
        </div>
    );
}

export default Feed;