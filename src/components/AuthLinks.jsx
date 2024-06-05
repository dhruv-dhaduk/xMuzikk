import { Link } from "react-router-dom";

function AuthLinks({ message }) {
    return (
        <div className='flex justify-center p-4'>
            <div className='p-4 bg-card border border-card w-full tablet:max-w-[30rem] rounded-3xl'>
                <p className='text-center text-lg font-semibold select-none'>
                    { message }
                </p>

                <div className='flex justify-between h-10 gap-2 mt-4'>
                    <LinkBtn to='/login'>
                        Log in
                    </LinkBtn>
                    
                    <LinkBtn to='/signup'>
                        Sign up 
                    </LinkBtn>
                </div>
            </div>
        </div>
    )
}

function LinkBtn({ children, to, className }) {
    return (
        <Link
            to={to}
            className={`flex-1 flex justify-center items-center text-center bg-white text-black font-bold rounded-full cursor-pointer active:bg-opacity-80 ${className}`}
        >
            { children }
        </Link>
    )
}

export default AuthLinks;