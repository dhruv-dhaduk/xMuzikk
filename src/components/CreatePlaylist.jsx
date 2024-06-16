import { useState } from 'react';
import Popover from './ui/Popover.jsx';

function CreatePlaylist() {
    const [showForm, setShowForm] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    
    return (
        <div className='flex justify-center items-center py-6'>
            <button
                onClick={() => setShowForm(true)}
                className='px-4 py-2 rounded-lg text-lg font-bold bg-white text-black select-none active:bg-opacity-80'
            >
                Create new playlist
            </button>

            <Popover
                popoverShowing={showForm}
                setPopoverShowing={setShowForm}
                className='backdrop:bg-black backdrop:opacity-80 w-96 max-w-[90%] max-h-[90%] p-4 bg-black text-white border border-white border-opacity-30 rounded-2xl'
            >
                <p className='text-2xl text-center font-bold'>
                    Create new playlist                    
                </p>

                <form
                    onSubmit={e => {e.preventDefault(); alert(playlistName)}}
                    className='pt-6'
                >
                    <div>
                        <p className='text-sm mb-1 text-stone-200 select-none'>
                            Playlist Name
                        </p>
                        <input
                            type='text'
                            value={playlistName}
                            onChange={e => setPlaylistName(e.target.value)}
                            placeholder='Enter Playlist Name'
                            className='input-text w-full'
                        />
                    </div>

                    <div className='flex justify-center items-center gap-2 mt-4'>
                        <button
                            onClick={e => {e.preventDefault(); setPlaylistName(''); setShowForm(false); }}
                            className='flex-1 py-2 bg-[#101010] text-white font-bold rounded-full cursor-pointer border border-white border-opacity-20 active:scale-90 duration-200'
                        > 
                            Cancel
                        </button>

                        <input
                            type='submit'
                            value='Create'
                            className='flex-1 py-2 bg-white text-black font-bold rounded-full cursor-pointer active:bg-opacity-80 disabled:bg-opacity-50'
                        />
                    </div>

                </form>
            </Popover>
        </div>
    );
}

export default CreatePlaylist;