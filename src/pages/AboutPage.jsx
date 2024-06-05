import { Link } from "react-router-dom";
import { authService } from "../dataManager/AppwriteService.js";
import { useEffect, useState } from "react";

import AuthLinks from "../components/AuthLinks.jsx";
import Spinner from "../components/ui/Spinner.jsx";
function AboutPage() {

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

    return (
        <div className='w-full'>

            { 
                user === null && <AuthLinks message='Please login or signup to enable more features' />
            }

            {
                user && (
                    <div className='flex flex-col justify-start items-center p-4'>
                        <p className='text-2xl tablet:text-3xl font-bold select-none line-clamp-1'>
                            Hello, { user.name } ! 
                        </p>

                        <p className='py-2'>
                            <span className='select-none'>
                                You are logged in with
                                &nbsp;
                            </span>
                            { user.email }
                        </p>

                        <div>
                            <Link
                                to='/logout'
                                className='w-32 h-9 flex justify-center items-center text-center bg-black text-white border border-white font-bold rounded-full cursor-pointer active:bg-white active:text-black'
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                )
            }

            {
                user === undefined && (
                    <div className='flex justify-center p-4'>
                        <Spinner />
                    </div>
                )
            }
        </div>
    );
}

export default AboutPage;