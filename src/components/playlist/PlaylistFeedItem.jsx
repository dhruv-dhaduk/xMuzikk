import playlistIcon from '/icons/queue.svg';
import threeDotsIcon from '/icons/three_dots.svg';
import defaultThumbnail from '/images/music_icon_neon_blue.jpeg';

import { useNavigate } from 'react-router-dom';

function PlaylistFeedItem({ playlist, showMoreOptions }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/playlist/${playlist.$id}`)}
            className={`flex tablet:max-w-[28rem] gap-2 p-3 tablet:p-4 rounded-xl cursor-pointer select-none bg-white bg-opacity-5 border border-white border-opacity-10 active:bg-opacity-10`}
        >
            <div className='flex-none w-[6.5rem] tablet:flex-1 aspect-square relative'>
                <img
                    src={playlist.thumbnail || defaultThumbnail}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className='w-full h-full object-cover rounded-xl'
                />

                <div className='aspect-square w-6 tablet:w-8 m-1 p-1 tablet:p-1.5 flex justify-center items-center absolute bottom-0 right-0 bg-black bg-opacity-80 rounded-md'>
                    <img
                        src={playlistIcon}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className='w-full h-full'
                    />
                </div>
            </div>

            <div className='flex-1 flex flex-col justify-evenly tablet:justify-evenly items-start relative tablet:p-0 py-1.5 pr-10'>
                <p className='text-[16px]/[20px] tablet:text-[18px] line-clamp-2 tablet:line-clamp-3 break-all'>
                    {playlist.title}
                </p>

                {playlist.channelTitle && (
                    <div className='flex tablet:flex-col justify-start tablet:justify-evenly items-center tablet:items-start tablet:gap-2'>
                        <SmallP>{playlist.channelTitle}</SmallP>
                    </div>
                )}

                <SmallP>{playlist.itemCount} songs</SmallP>

                <div className='w-8 h-8 absolute bottom-0 right-0'>
                    <Icon
                        iconSrc={threeDotsIcon}
                        className='w-full h-full p-2'
                        onClick={showMoreOptions}
                    />
                </div>
            </div>
        </div>
    );
}

function SmallP({ children, className }) {
    return (
        <p
            className={`text-[13px]/[18px] tablet:text-[15px]/[18px] text-stone-400 line-clamp-1 break-all ${className}`}
        >
            {children}
        </p>
    );
}

function Icon({ iconSrc, className, onClick }) {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={`w-8 h-8 flex justify-center items-center active:scale-90 duration-200 ${className}`}
        >
            <img
                src={iconSrc}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className='w-full h-full'
            />
        </div>
    );
}

export default PlaylistFeedItem;
