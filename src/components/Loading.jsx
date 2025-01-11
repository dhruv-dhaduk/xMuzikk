function LoadingFeed({ count = 12 }) {
    return (
        <div className='grid grid-cols-1 tablet:grid-cols-feed tablet:gap-x-6 target:gap-y-12 tablet:p-6'>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <LoadingFeedItem key={i} />
                ))}
        </div>
    );
}

function LoadingFeedItem() {
    return (
        <div className='flex gap-2 p-3 tablet:p-4'>
            <div className='loading flex-none w-[6.5rem] tablet:flex-1 aspect-square rounded-xl'></div>

            <div className='flex-1 flex flex-col justify-start gap-3 pt-3'>
                <div className='loading w-full h-4 rounded'></div>
                <div className='loading w-full h-4 rounded'></div>
                <div className='loading w-1/2 h-4 rounded'></div>
            </div>
        </div>
    );
}

export default LoadingFeed;
