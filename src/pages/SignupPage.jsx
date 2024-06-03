import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from '../dataManager/AppwriteService.js';

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!name?.length) {
            alert('Please Enter Your Name');
            return;
        }
        
        if (!email?.length) {
            alert('Please Enter Your Email');
            return;
        }
        
        if (!password?.length) {
            alert('Please Enter the Password');
            return;
        }
        
        if (!confirmPassword?.length) {
            alert('Please Confirm the Password');
            return;
        }

        if (password !== confirmPassword) {
            alert(`Confirm Password doesn't match the Password.`);
            return;
        }

        if (password.length < 8) {
            alert('Password must be atleast 8 characters long.');
            return;
        }

        setSubmitDisabled(true);

        authService
            .createAccount(email, password, name)
            .then(({response, error}) => {
                if (error) {
                    console.log(error);
                    alert(`Error : ${error.message}`);
                    return;
                }
                else {
                    console.log(response);
                    navigate('/login');
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
                    Sign Up
                </h1>

                <form
                    className='flex flex-col gap-4 px-4 pt-6'
                    onSubmit={handleSubmit}
                >

                    <div>
                        <Label>Your Name</Label>
                        <input
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder='Enter Your Name'
                            className='input-text w-full'
                        />
                    </div>

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
                        <Label>Create Password</Label>
                        <input
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Enter a Password'
                            className='input-text w-full'
                        />
                    </div>

                    <div>
                        <Label>Confirm Password</Label>
                        <input
                            type='password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder='Confirm your Password'
                            className='input-text w-full'
                        />
                        <p className='text-[12px]'>
                            {
                                (confirmPassword.length && confirmPassword === password) ? <span className='text-green-500'>(Password matches)</span> : ''
                            }
                            {
                                (confirmPassword.length && confirmPassword !== password) ? <span className='text-red-500'>(Password doesn't match)</span> : ''
                            }
                        </p>
                    </div>

                    <div className='mt-4'>
                        <input
                            type='submit'
                            value='Create Account'
                            disabled={submitDisabled}
                            className='w-full h-10 bg-white text-black font-bold rounded-full cursor-pointer active:bg-opacity-80 disabled:bg-opacity-50'
                        />
                    </div>

                </form>
                
                <hr className='m-4 mt-6 border-[#666666]' />

                <p className='p-4 pt-0 text-center text-[15px] select-none'>
                    Already have an account ? 
                    <Link
                        to='/login'
                        className='px-1 font-bold underline'
                    >
                        Log in
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

export default SignupPage;