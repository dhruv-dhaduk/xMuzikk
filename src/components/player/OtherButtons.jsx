import Icon from './Icon.jsx';
import Toggle from '../ui/Toggle.jsx';
import Slider from '../ui/Slider.jsx';

import youtubeIcon from '/icons/youtube.svg';
import shareIcon from '/icons/share.svg';
import closeIcon from '/icons/close.svg';

function OtherButtonsLg({ hidePlayer }) {
    return (
        <div className='w-full hidden tablet:flex justify-start items-center gap-2'>
            <Icon imgSrc={youtubeIcon} className='w-16 p-4 rounded-full' />
            <Icon imgSrc={shareIcon} className='w-16 p-4 rounded-full' />
            <Icon imgSrc={closeIcon} onClick={hidePlayer} className='w-16 ml-auto p-2 bg-white bg-opacity-25 rounded-full' />
        </div>
    );
}

function ShowVideoToggleAndVolumeBarLg() {
    return (
        <div className='hidden tablet:flex justify-between items-center gap-2'>
            <div className='flex flex-col justify-center items-center'>
                <Toggle className='h-8' />
                <p className='text-sm line-clamp-1'>Play Video</p>
            </div>
            <div className='w-full max-w-60 flex flex-col justify-center'>
                <Slider />
                <p className='flex justify-between items-center text-sm line-clamp-1'>
                    <span>Volume</span>
                    <span>70%</span>
                </p>
            </div>
        </div>
    );
}

function OtherButtonsSm({ hidePlayer }) {
    return (
        <div className='tablet:hidden flex justify-start items-center gap-1 mt-auto'>
            <div className='flex flex-col justify-center items-center'>
                <Toggle className='h-7' />
                <p className='text-xs line-clamp-1'>Play Video</p>
            </div>
            <Icon imgSrc={youtubeIcon} className='w-12 p-3 ml-auto rounded-full' />
            <Icon imgSrc={shareIcon} className='w-12 p-3 rounded-full' />
            <Icon imgSrc={closeIcon} onClick={hidePlayer} className='w-14 p-2.5 bg-white bg-opacity-25 rounded-full' />
        </div>
    );
}

export { OtherButtonsLg, ShowVideoToggleAndVolumeBarLg, OtherButtonsSm };