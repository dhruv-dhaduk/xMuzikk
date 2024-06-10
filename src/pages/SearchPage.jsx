import { useEffect, useState } from 'react';

import { authService, searchService } from '../dataManager/AppwriteService.js';

import Spinner from '../components/ui/Spinner.jsx';
import AuthLinks from '../components/AuthLinks.jsx';
import SearchKeywords from '../components/SearchKeywords.jsx';

function SearchPage() {
    const [user, setUser] = useState(undefined);
    const [searchInput, setSearchInput] = useState('');
    const [searchLimit, setSearchLimit] = useState(undefined);

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

    useEffect(() => {
        if (!user)
            return;

        const fetchSearchLimit = async () => {
            try {
                const { limit, maxLimit } = await searchService.getSearchLimit(user.$id);

                setSearchLimit({ limit, maxLimit });
            } catch (err) {
                setSearchLimit(null);
            }
        }

        fetchSearchLimit();

    }, [user]);

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
                    <SearchKeywords
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                    />

                    <div>
                        {
                            user
                            &&
                            searchLimit === undefined
                            &&
                            <div className='flex justify-center p-4'>
                                <Spinner />
                            </div>
                        }

                        {
                            user
                            &&
                            searchLimit
                            &&
                            <div className='pt-10'>
                                <p className='text-xl font-bold text-center'>
                                    { searchLimit.limit } searches remaining for today
                                </p>

                                <p className='text-lg font-semibold text-center'>
                                    (Total searches per day : { searchLimit.maxLimit })
                                </p>

                                <div className='mt-4'>
                                    <p className='text-xs text-center py-0.5'>
                                        We limit the number of searches you can execute per day due to high infrastructure costs.
                                    </p>
                                    <p className='text-xs text-center py-0.5'>
                                        This limit only applies to new searches you make, not on search results already cached on our database.    
                                    </p>
                                    <p className='text-xs text-center py-0.5'>
                                        Search limit will reset every day at 12:00 AM IST.    
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default SearchPage;