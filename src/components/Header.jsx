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
        window.scrollTo(0, 0);
        
        if (playerContext.isPlayerShowing || location.pathname === '/')
            return;

        navigate('/');
    }
    
    return (
        <header 
            className={`flex justify-center tablet:justify-start bg-black backdrop-blur-[8px] bg-opacity-50 border-b border-slate-900 ${className}`}
        >
            <div 
                className={`w-fit h-full flex justify-start items-center p-2.5 tablet:p-3 active:bg-slate-800 cursor-pointer ${!isMobileDevice ? 'hover:bg-slate-900' : ''}`}
                onClick={gotoHome}    
            >
                <img 
                    src={logo}
                    onContextMenu={e => e.preventDefault()}
                    draggable={false}
                    className='h-full'
                />
            </div>
        </header>
    );
}

export default Header;