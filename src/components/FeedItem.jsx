function FeedItem({ music }) {
    return (
        <div>
            <img src={music.thumbnail} className='w-full max-w-96' />
            <br />
            <p className='mb-4 w-full overflow-x-hidden'>
                { JSON.stringify(music) }
            </p>
        </div>
    );
}

export default FeedItem;