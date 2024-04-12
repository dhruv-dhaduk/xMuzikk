import logo from '/logos/xMuzikk.png';
import isMobileDevice from '../utils/isMobileDevice.js';

import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerContext.js';

function Header({ className }) {

    const playerContext = useContext(PlayerContext);
    const navigate = useNavigate();
    const location = useLocation();

    const gotoHome = () => {
        if (playerContext.isPlayerShowing || location.pathname === '/')
            return;

        navigate('/');
        window.scrollTo(0, 0);
    }
    
    return (
        <header 
            className={`bg-black z-50 flex justify-start border-b border-slate-900 backdrop-blur-md bg-opacity-65 ${className}`}
        >
            <div 
                className={`w-fit h-full p-2.5 flex justify-start items-center cursor-pointer tablet:p-3 active:bg-slate-800 ${!isMobileDevice ? 'hover:bg-slate-900' : ''}`}
                onClick={gotoHome}    
            >
                <img 
                    src={logo}
                    draggable={false}
                    className='h-full'
                />
            </div>
        </header>
    );
}

export default Header;