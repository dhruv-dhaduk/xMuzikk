import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../dataManager/AppwriteService.js";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email?.length) {
            alert('Please Enter Your Email');
            return;
        }
        
        if (!password?.length) {
            alert('Please Enter Your Password');
            return;
        }

        setSubmitDisabled(true);

        authService
            .login(email, password)
            .then(({response, error}) => {
                if (error) {
                    console.log(error);
                    alert(`Error : ${error.message}`);
                    return;
                }
                else {
                    console.log(response);
                    navigate('/about');
                }
            })
            .catch((err) => {
                console.log(err);
                alert(`Error : ${err.message}`);
            })
            .finally(() => {
                setSubmitDisabled(false);
            });
    }
    
    return (
        <div className='flex justify-center p-4'>
            <div className='bg-card border border-card w-full tablet:max-w-[30rem] rounded-3xl'>
                <h1 className='py-3 text-center text-3xl font-semibold select-none'>
                    Log in
                </h1>

                <form
                    className='flex flex-col gap-4 px-4 pt-6'
                    onSubmit={handleSubmit}
                >

                    <div>
                        <Label>Your Email</Label>
                        <input
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            className='input-text w-full'
                        />
                    </div>

                    <div>
                        <Label>Your Password</Label>
                        <input
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter Your Password'
                            className='input-text w-full'
                        />
                    </div>

                    <div className='mt-4'>
                        <input
                            type='submit'
                            value='Log in'
                            disabled={submitDisabled}
                            className='w-full h-10 bg-white text-black font-bold rounded-full cursor-pointer active:bg-opacity-80 disabled:bg-opacity-50'
                        />
                    </div>

                </form>
                
                <hr className='m-4 mt-6 border-[#666666]' />

                <p className='p-4 pt-0 text-center text-[15px] select-none'>
                    Don't have an account ? 
                    <Link
                        to='/signup'
                        className='px-1 font-bold underline'
                    >
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}

function Label({ children }) {
    return (
        <p className='text-sm mb-1 text-stone-200 select-none'>
            { children }
        </p>
    );
}

export default LoginPage;