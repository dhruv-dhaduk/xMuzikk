function PlaylistMetaData({ playlist }) {
    return (
        <div className=''>
            <div className='aspect-square rounded-2xl overflow-hidden'>
                <img
                    src={playlist.thumbnail}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                    className='w-full h-full object-cover'
                />
            </div>

            <p className='text-xl font-bold line-clamp-2 break-all'>
                { playlist.title }
            </p>


            <p className='text-sm line-clamp-1 break-all'>

                {
                    playlist.channelTitle && (
                        <>
                            <span className=''>
                                { playlist.channelTitle }   
                            </span>

                            <span className='px-1.5 font-bold text-lg'>·</span>
                        </>
                    )
                }


                { playlist.itemCount } songs
            </p>

        </div>
    );
}

export default PlaylistMetaData;