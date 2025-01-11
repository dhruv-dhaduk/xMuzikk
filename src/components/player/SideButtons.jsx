import closeIcon from '/icons/close.svg';
import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import refreshIcon from '/icons/refresh.svg';
import heartIcon from '/icons/heart_hollow.svg';

function SideButtons({ videoID, title, hidePlayer, refreshPlayer }) {
    return (
        <div className='w-12 min-h-full p-1 flex flex-col items-center justify-between'>
            <Btn
                iconSrc={closeIcon}
                className='bg-white rounded-full bg-opacity-25 p-[6px]'
            />
            <Btn
                iconSrc={shareIcon}
                className='p-[7px]'
            />
            <Btn
                iconSrc={youtubeIcon}
                className='p-[7px]'
            />
            <Btn
                iconSrc={refreshIcon}
                className='p-[7px]'
            />
            <Btn
                iconSrc={heartIcon}
                className='p-[6px]'
            />
        </div>
    );
}

function Btn({ iconSrc, className, onClick }) {
    return (
        <button
            className={`w-full aspect-square ${className}`}
            onClick={onClick}
        >
            <img
                src={iconSrc}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                className='w-full h-full'
            />
        </button>
    )
}

export default SideButtons;