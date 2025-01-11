import Icon from './Icon.jsx';

import heartHollowIcon from '/icons/heart_hollow.svg';

import { convertUploadTimeFormat } from '../../utils/converters.js';

function TitlesAndLike({ title, channelTitle, uploadTime }) {
    return (
        <div className='flex justify-between items-start mt-3 tablet:mt-8 mb-8'>
            <div className='flex-1'>
                <p className='mb-0.5 tablet:mb-1.5 text-xl font-bold line-clamp-1 tablet:line-clamp-2'>
                    {title}
                </p>

                <p className='text-sm line-clamp-1'>
                    {channelTitle}
                    <span className='mx-2 font-bold'>·</span>
                    {convertUploadTimeFormat(uploadTime)}
                </p>
            </div>

            <Icon
                imgSrc={heartHollowIcon}
                className='hidden flex-none w-10 tablet:w-12 p-0'
            />
        </div>
    );
}

export default TitlesAndLike;
