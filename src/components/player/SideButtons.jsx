import closeIcon from '/icons/close.svg';
import shareIcon from '/icons/share.svg';
import youtubeIcon from '/icons/youtube.svg';
import refreshIcon from '/icons/refresh.svg';
import heartIcon from '/icons/heart_hollow.svg';

function SideButtons({ videoID, title, hidePlayer, refreshPlayer }) {
    const shareMusic = () => {
        if (!navigator.share) return;

        navigator.share({
            title,
            url: `/music/${videoID}`,
        });
    };

    const openInYouTube = () => {
        const isAgreed = window.confirm('Play this song in YouTube ?');
        if (isAgreed)
            window.open(`https://youtu.be/${videoID}`, '_blank');
    }
    
    return (
        <div className='w-12 min-h-full p-1 flex flex-col items-center justify-between'>
            <Btn
                onClick={hidePlayer}
                iconSrc={closeIcon}
                className='bg-white rounded-full bg-opacity-25 p-[6px]'
            />
            <Btn
                onClick={shareMusic}
                iconSrc={shareIcon}
                className='p-[7px]'
            />
            <Btn
                onClick={openInYouTube}
                iconSrc={youtubeIcon}
                className='p-[7px]'
            />
            <Btn
                onClick={refreshPlayer}
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
            className={`w-full aspect-square cursor-pointer active:scale-[0.8] duration-200 ${className}`}
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