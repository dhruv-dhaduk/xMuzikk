import { Link } from "react-router-dom";

function SignupPage() {
    return (
        <div className='flex justify-center p-4'>
            <div className='bg-card border border-card w-full tablet:max-w-[30rem] rounded-3xl'>
                <h1 className='py-3 text-center text-3xl font-semibold select-none'>
                    Sign Up
                </h1>

                <form
                    className='flex flex-col gap-4 px-4 pt-6'
                    onSubmit={e => e.preventDefault()}
                >

                    <div>
                        <Label>Your Name</Label>
                        <input
                            type="text"
                            name='name'
                            placeholder='Enter Your Name'
                            className='input-text w-full'
                        />
                    </div>

                    <div>
                        <Label>Your Email</Label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Your Email'
                            className='input-text w-full'
                        />
                    </div>

                    <div>
                        <Label>Create Password</Label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter a Password'
                            className='input-text w-full'
                        />
                    </div>

                    <div>
                        <Label>Confirm Password</Label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Confirm your Password'
                            className='input-text w-full'
                        />
                    </div>

                    <div className='mt-4'>
                        <input
                            type='submit'
                            value='Create Account'
                            className='w-full h-10 bg-white text-black font-bold rounded-full cursor-pointer active:bg-opacity-80'
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