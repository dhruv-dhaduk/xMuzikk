import { useEffect, useState } from 'react';

import { authService } from '../dataManager/AppwriteService.js';

import Spinner from '../components/ui/Spinner.jsx';
import AuthLinks from '../components/AuthLinks.jsx';

function SearchPage() {
    const [user, setUser] = useState(undefined);

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
                    onSubmit={e => {e.preventDefault(); alert('submit')}}
                    className='flex justify-between items-center gap-1'
                >
                    <input
                        type='text'
                        placeholder='Search'
                        className='search-box flex-1'
                    />

                    <input
                        type='submit'
                        value=''
                        className='search-submit flex-none'
                    />

                </form>

            </div>
        </div>
    );
}

export default SearchPage;