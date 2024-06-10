import { useState } from 'react';

import upLeftArrowIcon from '/icons/up_left_arrow.svg';

function SearchKeywords() {
    const [keywords, setKeywords] = useState([
        {
            query: 'Hello, World 1',
            '$id': 'abcd1'
        },
        {
            query: 'Hello, World 2',
            '$id': 'abcd2'
        },
        {
            query: 'Hello, World 3',
            '$id': 'abcd3'
        },
        {
            query: 'Hello, World 4',
            '$id': 'abcd4'
        },
    ]);

    if (!keywords?.length) {
        return null;
    }

    return (    
        <div>
            {
                keywords.map((item) => (
                    <div
                        key={item.$id}
                        className='flex justify-between items-stretch h-9 bg-[#181818] border-b border-[#393939]'
                    >
                        <p className='flex-1 line-clamp-1 flex justify-start items-center text-sm px-2 text-[#c4c4c4]'> 
                            {item.query}
                        </p>

                        <div

                            className='flex-none flex justify-center items-center aspect-square cursor-pointer bg-[#454545] active:bg-black'
                        >
                            <img
                                src={upLeftArrowIcon}
                                draggable={false}
                                onContextMenu={e => e.preventDefault()}
                                className='w-6 aspect-square'
                            />
                        </div>
                    </div>
                ))        
            }
        </div>
    );
}

export default SearchKeywords;