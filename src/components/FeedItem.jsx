import { convertDurationFormat, convertUploadTimeFormat } from '../utils/converters.js';

import playIcon from '/icons/play.svg';
import threeDotsIcon from '/icons/threedots.svg';

function FeedItem({ music, onClick, isPlaying }) {
    return (
        <div 
            onClick={onClick}
            className={`flex gap-2 p-3 tablet:p-4 bg-transparent from-primary-light-35 to-primary-dark-35 rounded-xl cursor-pointer select-none ${isPlaying ? 'bg-gradient-to-r' : ''}`}
        >

            <div className='flex-none w-[6.5rem] tablet:flex-1 aspect-square'>
                <img 
                    src={music.thumbnail} 
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                    className='w-full h-full object-cover rounded-xl'
                />
            </div>

            <div className='flex-1 flex flex-col justify-between tablet:justify-evenly items-start relative tablet:p-0 py-1.5 pr-10'>
                <p className='text-[16px]/[20px] tablet:text-[18px] line-clamp-2 tablet:line-clamp-3'>
                    { music.title }
                </p>


                <div className='flex tablet:flex-col justify-start tablet:justify-evenly items-center tablet:items-start tablet:gap-2'>
                    <SmallP>
                        { music.channelTitle }
                    </SmallP>

                    <SmallP className='tablet:hidden mx-1'>·</SmallP>

                    <SmallP>

                        { convertUploadTimeFormat(music.uploadTime) }
                    </SmallP>
                </div>

                <SmallP>
                    { convertDurationFormat(music.duration) }
                </SmallP>

                <div className='w-8 tablet:w-fit h-full tablet:h-8 flex flex-col-reverse tablet:flex-row justify-between tablet:justify-center items-center absolute inset-y-0 tablet:top-auto right-0 tablet:right-0 tablet:bottom-0'>
                    <Icon iconSrc={playIcon} />
                    <Icon iconSrc={threeDotsIcon} />
                </div>

            </div>
        </div>
    );
}

function SmallP({ children, className }) {
    return (
        <p className={`text-[13px]/[13px] tablet:text-[15px]/[18px] text-stone-400 line-clamp-1 ${className}`}>
            { children }
        </p>
    );
}

function Icon({ iconSrc }) {
    return (
        <div className='w-8 h-8 flex justify-center items-center p-2'>
            <img 
                src={iconSrc}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                className='w-full h-full'
            />
        </div>
    );
}

export default FeedItem;