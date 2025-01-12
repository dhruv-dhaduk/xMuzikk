import { convertUploadTimeFormat } from '../../utils/converters.js';

function Title({ title, channelTitle, uploadTime }) {
    return (
        <div>
            <p className='mb-0.5 text-xl font-bold line-clamp-1'>{title}</p>

            <p className='text-sm line-clamp-1'>
                {channelTitle}
                <span className='mx-2 font-bold'>·</span>
                {convertUploadTimeFormat(uploadTime)}
            </p>
        </div>
    );
}

export default Title;
