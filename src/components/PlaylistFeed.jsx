import PlaylistItem from './PlaylistItem.jsx';

function PlaylistFeed({ playlistItems }) {

    if (!playlistItems?.length) {
        return (
            <LoadingFeed />
        )
    }

    return (
        <div>
            {
                [...playlistItems, ...playlistItems, ...playlistItems].map((item, index) => (
                    <PlaylistItem key={index} item={item} index={index + 1} />
                ))  
            }
        </div>
    )
}

function LoadingFeed({ count = 10 }) {
    return (
        <div>
            { 
                Array(count).fill(0).map((_, i) => <LoadingFeedItem key={i} />)
            }
        </div>
    );
}

function LoadingFeedItem() {
    return (
        <div className='flex gap-2 p-3'>
            <div className='loading flex-none w-[6.5rem] aspect-square rounded-xl'>
            </div>

            <div className='flex-1 flex flex-col justify-start gap-3 pt-3'>
                <div className='loading w-full h-4 rounded'></div>
                <div className='loading w-full h-4 rounded'></div>
                <div className='loading w-1/2 h-4 rounded'></div>
            </div>
        </div>
    );
}

export default PlaylistFeed;