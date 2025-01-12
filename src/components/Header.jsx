import logo from '/logos/xMuzikk.png';
import githubIcon from '/icons/github.svg';
import isMobileDevice from '../utils/isMobileDevice.js';

import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerContext.js';

function Header({ className }) {
    const playerContext = useContext(PlayerContext);
    const navigate = useNavigate();
    const location = useLocation();

    const gotoHome = () => {
        window.scrollTo(0, 0);

        if (playerContext.isPlayerShowing || location.pathname === '/') return;

        navigate('/');
    };

    return (
        <header
            className={`flex justify-between bg-black backdrop-blur-[8px] bg-opacity-50 border-b border-slate-900 ${className}`}
        >
            <div
                className={`w-fit h-full flex justify-start items-center p-2.5 tablet:p-3 active:bg-slate-800 cursor-pointer ${!isMobileDevice ? 'hover:bg-slate-900' : ''}`}
                onClick={gotoHome}
            >
                <img
                    src={logo}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    className='h-full'
                />
            </div>

            <a
                href='https://github.com/dhruv-dhaduk/xMuzikk'
                target='_blank'
                className={`h-full flex justify-stretch items-center gap-3 p-2.5 tablet:p-3 active:bg-slate-800 ${!isMobileDevice ? 'hover:bg-slate-900' : ''}`}
            >
                <img
                    src={githubIcon}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    className='w-full h-full'
                />

                <p className='hidden tablet:block w-fit h-full whitespace-nowrap text-lg font-bold relative top-0.5'>
                    Source Code
                </p>
            </a>
        </header>
    );
}

export default Header;
