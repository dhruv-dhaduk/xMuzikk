import { convertDurationFormat, convertUploadTimeFormat } from '../utils/converters.js';

import playIcon from '/icons/play.svg';
import threeDotsIcon from '/icons/threedots.svg';

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

                <SmallP>
                    { music.channelTitle }
                </SmallP>

                <SmallP>

                    { convertUploadTimeFormat(music.uploadTime) }
                </SmallP>

                <SmallP>
                    { convertDurationFormat(music.duration) }
                </SmallP>

                <div>
                    <img 
                        src={playIcon}
                        alt="" 
                    />
                </div>
                <div>
                    <img 
                        src={threeDotsIcon}
                        alt="" 
                    />
                </div>
            </div>
        </div>
    );
}

function SmallP({ children }) {
    return (
        <p className='text-stone-400 text-[13px]/[13px] tablet:text-[15px]/[15px]'>
            { children }
        </p>
    );
}

export default FeedItem;