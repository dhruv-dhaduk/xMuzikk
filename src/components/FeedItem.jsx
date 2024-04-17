function FeedItem({ music }) {
    return (
        <div className='bg-slate-800'>
            <img src={music.thumbnail} className='w-full' />
            <br />
            <p className='mb-4 w-full overflow-x-hidden'>
                { JSON.stringify(music) }
            </p>
        </div>
    );
}

export default FeedItem;