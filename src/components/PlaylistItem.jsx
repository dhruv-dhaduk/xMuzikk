import { convertDurationFormat, convertUploadTimeFormat } from '../utils/converters.js';
import isMobileDevice from '../utils/isMobileDevice.js';

import playIcon from '/icons/play.svg';
import threeDotsIcon from '/icons/three_dots.svg';
import dragIcon from '/icons/hamburger.svg';

function PlaylistItem({ item, index, isRearrangable, isPlaying, playMusic, showPlayer, showMoreOptions }) {

    return (
        <div
            onClick={() => {
                if (isRearrangable) {
                    if (!isPlaying)
                        playMusic();
                    showPlayer();
                }
            }}
            className={`flex gap-2 p-3 bg-transparent from-primary-light-35 to-primary-dark-35 rounded-xl cursor-pointer select-none ${isPlaying ? 'bg-gradient-to-r' : ''} ${!isMobileDevice && !isPlaying ? 'hover:bg-white hover:bg-opacity-15' : ''}`}
        >   

            <div className='flex-none flex justify-center items-center w-[3ch] text-stone-300 font-semibold'>
                {
                    isRearrangable ? (
                        <Icon
                            iconSrc={dragIcon}
                            className='p-0.5'
                        />
                    ) : index
                }
            </div>

            <div className='flex-none w-[6.5rem] aspect-square'>
                <img 
                    src={item.thumbnail} 
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                    className='w-full h-full object-cover rounded-xl'
                />
            </div>

            <div className='flex-1 flex flex-col justify-between items-start py-1.5'>
                <p className='text-[16px]/[20px] line-clamp-2 break-all'>
                    { item.title }
                </p>


                <div className='flex justify-start items-center'>
                    <SmallP>
                        { item.channelTitle }
                    </SmallP>

                    <SmallP className='mx-1'>·</SmallP>

                    <SmallP>

                        { convertUploadTimeFormat(item.uploadTime) }
                    </SmallP>
                </div>

                <SmallP>
                    { convertDurationFormat(item.duration) }
                </SmallP>
            </div>

            {
                !isRearrangable && (
                    <div className='flex-none w-8 flex flex-col justify-between items-center bg-slate-'>
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
                )
            }


        </div>
    )
}

function SmallP({ children, className }) {
    return (
        <p className={`text-[13px]/[13px] text-stone-400 line-clamp-1 break-all ${className}`}>
            { children }
        </p>
    );
}

function Icon({ iconSrc, className, onClick }) {
    return (
        <div
            onClick={e => { e.stopPropagation(); onClick(); }}
            className={`w-8 h-8 flex justify-center items-center active:scale-90 duration-200 ${className}`}
        >
            <img 
                src={iconSrc}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                className='w-full h-full'
            />
        </div>
    );
}

export default PlaylistItem;