import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Spinner from './ui/Spinner.jsx';

import upLeftArrowIcon from '/icons/up_left_arrow.svg';

import { searchService } from '../dataManager/AppwriteService.js';

function SearchKeywords({ searchInput, setSearchInput }) {
    const [queryInput, setQueryInput] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [keywords, setKeywords] = useState([]);

    const timeoutID = useRef(-1);

    useEffect(() => {
        const inputKeywords = searchInput.split(' ').filter((item) => item.length > 0);

        if (JSON.stringify(queryInput) !== JSON.stringify(inputKeywords)) {
            setQueryInput(inputKeywords);
        }
    }, [searchInput]);

    useEffect(() => {
        clearTimeout(timeoutID.current);

        if (queryInput.length === 0) {
            setKeywords([]);
            return;
        }

        timeoutID.current = setTimeout(() => {
            setIsLoading(true);

            searchService
                .queryCache(queryInput.join(' '))
                .then((response) => {
                    setKeywords(response);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 750);
    }, [queryInput]);

    if (isLoading) {
        return (
            <div className='absolute top-0 w-full h-[28rem] overflow-y-scroll bg-black'>
                <div className='flex justify-center p-4 bg-[#181818]'>
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!keywords?.length) {
        return null;
    }


    return ( 
        <div className='absolute top-0 w-full h-[28rem] overflow-y-scroll bg-black'>
            <div>
                {
                    keywords.map((item) => (
                        <div
                            key={item.$id}
                            className='flex justify-between items-stretch h-9 bg-[#181818] border-b border-[#393939]'
                        >
                            <Link
                                to={`/searchresults/${item.$id}`}
                                className='flex-1 line-clamp-1 flex justify-start items-center text-sm px-2 text-[#c4c4c4]'
                            > 
                                {item.query}
                            </Link>

                            <div
                                onClick={() => setSearchInput(item.query)}
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
        </div>
        
    );
}

export default SearchKeywords;