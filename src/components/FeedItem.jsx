function FeedItem({ music }) {
    return (
        <div className='bg-transparent rounded-xl flex p-3 gap-2 tablet:p-4 hover:bg-gradient-to-r from-primary-light-35 to-primary-dark-35'>

            <div className='aspect-square w-[6.5rem] flex-none tablet:flex-1'>
                <img src={music.thumbnail} className='w-full h-full object-cover rounded-xl' />
            </div>

            <div className='tablet:flex-1 flex-1'>
                <p className='line-clamp-2 text-[16px]/[20px] tablet:line-clamp-3 tablet:text-[18px]'>
                    { music.title }
                </p>
            </div>
        </div>
    );
}

export default FeedItem;