import { Link } from "react-router-dom";
import { authService } from "../dataManager/AppwriteService.js";
import { useEffect, useState } from "react";

import AuthLinks from "../components/AuthLinks.jsx";

function AboutPage() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { response } = await authService.getAccountDetails();

            setUser(response);
        }

        fetchUser();
    }, []);

    return (
        <div className='w-full'>

            <AuthLinks message='Please login or signup to enable more features' />

            <div className='p-4'>
                <p>Your Name : { user?.name }</p>
                <p>Your Email : { user?.email }</p>
            </div>

            <div className='p-4'>
                <Link to='/signup'>
                    Sign Up
                </Link>

                <br />
                
                <Link to='/login'>
                    Login
                </Link>

                <br />
                
                <Link to='/logout'>
                    Logout
                </Link>
            </div>
        </div>
    );
}

export default AboutPage;