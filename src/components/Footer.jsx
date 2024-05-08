import pauseIcon from '/icons/pause.svg';
import previousIcon from '/icons/previous.svg';
import nextIcon from '/icons/next.svg';

function Footer({ className, onClick, playingMusic }) {

    if (!playingMusic || !playingMusic.id) {
        return null;
    }

    return (
        <footer
            onClick={onClick}
            className={`bg-black flex flex-col tablet:flex-col-reverse overflow-hidden shadow-footer rounded-full tablet:rounded-none ${className}`}
        >

            <img 
                src={playingMusic.thumbnail}
                className='-z-10 w-full h-full object-cover absolute inset-0 blur-xl tablet:blur-2xl opacity-50'
            />
            
            <div className='flex-1 flex items-center pl-6 pr-2.5 tablet:px-4'>
                <div className='w-footer-thmb-m h-footer-thmb-m tablet:w-footer-thmb tablet:h-footer-thmb'>
                    <img 
                        src={playingMusic.thumbnail}
                        className='w-full h-full object-cover rounded-md'
                    />
                </div>

                <div className='flex-1 mx-2'>
                    <p className='line-clamp-1 font-bold tablet:text-lg'>
                        { playingMusic.title }
                    </p>

                    <p className='text-xs tablet:text-sm'>
                        <span> { playingMusic.channelTitle } </span>
                        <span className='hidden tablet:inline font-bold mx-1'> · </span>
                        <span className='hidden tablet:inline'>3 years ago</span>
                        <span className='hidden tablet:inline font-bold mx-1'> · </span>
                        <span className='hidden tablet:inline'>02:11 <span className='font-bold'>/</span> 03:54</span>
                    </p>
                </div>

                <div className='flex gap-2 justify-center items-center'>
                    <Icon iconSrc={previousIcon} className='hidden tablet:block tablet:w-12 tablet:h-12 tablet:p-3 rounded-full' />
                    <Icon iconSrc={pauseIcon} className='w-11 h-11 p-3 tablet:w-12 tablet:h-12 tablet:p-3.5 rounded-full bg-white bg-opacity-25' />
                    <Icon iconSrc={nextIcon} className='hidden tablet:block tablet:w-12 tablet:h-12 tablet:p-3 rounded-full' />
                </div>
            </div>

            <progress className='footer-progressbar w-full h-1 tablet:h-1.5 flex-none' min={0} max={100} value={70} />

        </footer>
    );
}

function Icon({ iconSrc, className }) {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <img 
                src={iconSrc}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                className='w-full h-full'
            />
        </div>
    );
}

export default Footer;