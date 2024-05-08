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
            className={`bg-black flex justify-start border-b border-slate-900 backdrop-blur-[8px] bg-opacity-50 ${className}`}
        >
            <div 
                className={`w-fit h-full p-2.5 flex justify-start items-center cursor-pointer tablet:p-3 active:bg-slate-800 ${!isMobileDevice ? 'hover:bg-slate-900' : ''}`}
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