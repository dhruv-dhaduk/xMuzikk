import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from '../contexts/UserContext.js';

import AuthLinks from "../components/AuthLinks.jsx";
import Spinner from "../components/ui/Spinner.jsx";

function AboutPage() {

    const { user } = useContext(UserContext);

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

            <div className='flex justify-center mt-10 p-4'>
                <div className='w-full max-w-[50rem]'>
                    <h1 className='mb-2 text-2xl tablet:text-3xl font-bold select-none'>About this site</h1>
                    <hr className='mt-1 mb-4 border border-[#505050]' />

                    <P>Hello, World !</P>
                    <P>This is xMuzikk : A music player for the web, where you can listen to your favorite music on your phone, tablet or computer. (Some features are still in development and will be available soon.)</P>
                    <P>It is built with React, TailwindCSS, Appwrite and YouTube APIs.</P>
                    <P>
                        Here is the Source Code link : 
                        &nbsp;
                        <a
                            href='https://github.com/dhruv-dhaduk/xMuzikk'
                            target='_blank'
                            className='underline select-all whitespace-nowrap'
                        >
                            https://github.com/dhruv-dhaduk/xMuzikk
                        </a>
                    </P>
                    
                    <P>This is a personal project, and it is only for my learning purposes.</P>
                    <P>All music and songs belongs to YouTube and their respective content creators. And link to original video on YouTube is provided with every music and song.</P>
                    
                </div>
            </div>

            <div className='flex justify-center p-4'>
                <div className='w-full max-w-[50rem]'>
                    <h1 className='mb-2 text-2xl tablet:text-3xl font-bold select-none'>About developer</h1>
                    <hr className='mt-1 mb-4 border border-[#505050]' />

                    <P>Hello, my name is Dhruv Dhaduk. I am a passionate software engineer from Gujarat, India.</P>
                    <P>I am currently studying Computer Engineering at the L.D. College of Engineering, Ahmedabad.</P>

                    <ul>
                        <h2 className='text-xl font-semibold'>
                            Here are my contact details : 
                        </h2>
                        
                        <li className='select-none indent-8 text-[15px]/[25px]'>
                            Email : <a href='mailto:dhadukd44@gmail.com' target='_blank' className='underline select-all whitespace-nowrap'>dhadukd44@gmail.com</a>
                        </li>
                        <li className='select-none indent-8 text-[15px]/[25px]'>
                            GitHub : <a href='https://github.com/dhruv-dhaduk' target='_blank' className='underline select-all whitespace-nowrap'>@dhruv-dhaduk</a>
                        </li>
                        <li className='select-none indent-8 text-[15px]/[25px]'>
                            X (Formerly Twitter) : <a href='https://x.com/dhruvdhaduk0' target='_blank' className='underline select-all whitespace-nowrap'>@dhruvdhaduk0</a>
                        </li>
                        <li className='select-none indent-8 text-[15px]/[25px]'>
                            LinkedIn : <a href='https://www.linkedin.com/in/dhruvdhaduk' target='_blank' className='underline select-all whitespace-nowrap'>in/dhruvdhaduk</a>
                        </li>
                            
                    </ul>
                </div>
            </div>

        </div>
    );
}

function P({ children, className }) {
    return <p className={`mx-1 my-4 text-[15px]/[25px] font-[400] font-sans select-none ${className}`}>{children}</p>;
}

export default AboutPage;