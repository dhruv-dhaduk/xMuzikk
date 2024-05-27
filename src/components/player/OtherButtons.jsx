import Icon from './Icon.jsx';

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

export { OtherButtonsLg };