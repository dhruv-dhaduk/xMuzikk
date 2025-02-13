import {
    convertDurationFormat,
    convertUploadTimeFormat,
} from '../utils/converters.js';

import playIcon from '/icons/play.svg';
import threeDotsIcon from '/icons/three_dots.svg';

function FeedItem({
    music,
    isPlaying,
    playMusic,
    showPlayer,
    showMoreOptions,
}) {
    return (
        <div
            onClick={() => {
                if (!isPlaying) playMusic();
                showPlayer();
            }}
            className={`flex tablet:max-w-[28rem] gap-2 p-3 tablet:p-4 bg-transparent from-primary-light-35 to-primary-dark-35 rounded-xl cursor-pointer select-none ${isPlaying ? 'bg-gradient-to-r' : ''}`}
        >
            <div className='flex-none w-[6.5rem] tablet:flex-1 aspect-square'>
                <img
                    src={music.thumbnail}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className='w-full h-full object-cover rounded-xl'
                />
            </div>

            <div className='flex-1 flex flex-col justify-between tablet:justify-evenly items-start relative tablet:p-0 py-1.5 pr-10'>
                <p className='text-[16px]/[20px] tablet:text-[18px] line-clamp-2 tablet:line-clamp-3 break-all'>
                    {music.title}
                </p>

                <div className='flex tablet:flex-col justify-start tablet:justify-evenly items-center tablet:items-start tablet:gap-2'>
                    <SmallP>{music.channelTitle}</SmallP>

                    <SmallP className='tablet:hidden mx-1'>·</SmallP>

                    <SmallP>{convertUploadTimeFormat(music.uploadTime)}</SmallP>
                </div>

                <SmallP>{convertDurationFormat(music.duration)}</SmallP>

                <div className='w-8 tablet:w-fit h-full tablet:h-8 flex flex-col tablet:flex-row justify-between tablet:justify-center items-center absolute inset-y-0 tablet:top-auto right-0 tablet:right-0 tablet:bottom-0'>
                    <Icon
                        iconSrc={threeDotsIcon}
                        className='p-2'
                        onClick={showMoreOptions}
                    />
                    <Icon
                        iconSrc={playIcon}
                        className='p-2'
                        onClick={!isPlaying ? playMusic : null}
                    />
                </div>
            </div>
        </div>
    );
}

function SmallP({ children, className }) {
    return (
        <p
            className={`text-[13px]/[13px] tablet:text-[15px]/[18px] text-stone-400 line-clamp-1 break-all ${className}`}
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

export default FeedItem;
