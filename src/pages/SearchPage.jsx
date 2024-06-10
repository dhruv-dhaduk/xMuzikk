import { useEffect, useState } from 'react';

import { authService } from '../dataManager/AppwriteService.js';

import Spinner from '../components/ui/Spinner.jsx';
import AuthLinks from '../components/AuthLinks.jsx';
import SearchKeywords from '../components/SearchKeywords.jsx';

function SearchPage() {
    const [user, setUser] = useState(undefined);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const { response } = await authService.getAccountDetails();

            if (!response) {
                setUser(null);
            }
            else {
                setUser(response);
            }
        }

        fetchUser();
    }, []);

    if (user === undefined) {
        return (
            <div className='flex justify-center p-4'>
                <Spinner />
            </div>
        );
    }

    if (user === null) {
        return (
            <AuthLinks message='Please Login or Signup to enable this feature' />
        );
    }

    return (
        <div className='flex justify-center p-4'>
            <div className='w-full max-w-[40rem]'>
                
                <form
                    onSubmit={e => {e.preventDefault(); alert(`submit : ${searchInput}`)}} 
                    className='flex justify-between items-center gap-1'
                >
                    <input
                        type='text'
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder='Search'
                        className='search-box flex-1'
                    />

                    <input
                        type='submit'
                        value=''
                        className='search-submit flex-none'
                    />

                </form>

                <div className='relative mt-1'>
                    <div className='absolute top-0 w-full h-fit max-h-[28rem] overflow-y-scroll bg-black'>
                        <SearchKeywords
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                        />
                    </div>

                    <div>
                        
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default SearchPage;