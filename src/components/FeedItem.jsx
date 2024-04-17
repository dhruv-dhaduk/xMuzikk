import { convertDurationFormat, convertUploadTimeFormat } from '../utils/converters.js';

import playIcon from '/icons/play.svg';
import threeDotsIcon from '/icons/threedots.svg';

function FeedItem({ music }) {
    return (
        <div className='bg-transparent rounded-xl flex p-3 gap-2 tablet:p-4 hover:bg-gradient-to-r from-primary-light-35 to-primary-dark-35'>

            <div className='aspect-square w-[6.5rem] flex-none tablet:flex-1'>
                <img src={music.thumbnail} className='w-full h-full object-cover rounded-xl' />
            </div>

            <div className='flex-1 relative flex flex-col items-start justify-between py-1.5 pr-10 tablet:p-0 tablet:justify-evenly'>
                <p className='line-clamp-2 text-[16px]/[20px] tablet:line-clamp-3 tablet:text-[18px]'>
                    { music.title }
                </p>


                <div className='flex items-center justify-start tablet:flex-col tablet:justify-evenly tablet:items-start tablet:gap-2'>
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

                <div className='absolute inset-y-0 right-0 h-full w-8 flex flex-col-reverse justify-between items-center tablet:w-fit tablet:h-8 tablet:right-0 tablet:bottom-0 tablet:top-auto tablet:flex-row tablet:justify-center'>
                    <Icon iconSrc={playIcon} />
                    <Icon iconSrc={threeDotsIcon} />
                </div>

            </div>
        </div>
    );
}

function SmallP({ children, className }) {
    return (
        <p className={`text-stone-400 text-[13px]/[13px] tablet:text-[15px]/[18px] line-clamp-1 ${className}`}>
            { children }
        </p>
    );
}

function Icon({ iconSrc }) {
    return (
        <div className='w-8 h-8 flex justify-center items-center p-2'>
            <img 
                src={iconSrc}
                className='w-full h-full'
            />
        </div>
    );
}

export default FeedItem;