import FeedItem from "./FeedItem";

function Feed({ musicList }) {
    return (
        <div className='grid grid-cols-1 gap-y-2 tablet:grid-cols-feed tablet:gap-x-6 target:gap-y-12 tablet:p-6'>
            {
                musicList.map(item => <FeedItem key={item.id} music={item} />)
            }
        </div>
    );
}

export default Feed;