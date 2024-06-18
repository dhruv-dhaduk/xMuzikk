import { useState } from "react";

import AsyncSubmitBtn from './AsyncSubmitBtn.jsx';

function AddToPlaylist({ music }) {
    const [userPlaylists, setUserPlaylists] = useState([]);

    if (!userPlaylists?.length)
        return null;

    return (
        <div className='w-full mt-4 p-2 rounded-lg bg-[#101010] border border-white border-opacity-20'>
            <p className='mb-2 font-semibold'>
                Add to playlist
            </p>

            <div className='w-full max-h-48 px-2 overflow-y-auto'>
                {
                    userPlaylists.map((playlist, i) => (
                        <AsyncSubmitBtn
                            key={i}
                            className='w-full h-7 my-2 flex justify-center items-center rounded-md bg-[#1e1e1e] border border-white border-opacity-10 active:scale-90 duration-200'
                            loadingClassName='w-full h-7 my-2 flex justify-center items-center rounded-md bg-[#1e1e1e] border border-white border-opacity-10'
                            spinnerSize={20}
                        >
                            <span className='text-xs line-clamp-1 break-all'>
                                { playlist.title }
                            </span>
                        </AsyncSubmitBtn>
                    ))
                }
            </div>
        </div>
    )
}

export default AddToPlaylist;