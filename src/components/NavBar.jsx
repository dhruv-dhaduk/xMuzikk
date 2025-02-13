import NavItem from './NavItem';
import homeIcon from '/icons/home.svg';
import searchIcon from '/icons/search.svg';
import playlistIcon from '/icons/playlist.svg';
import infoIcon from '/icons/info.svg';

import { PlayerContext } from '../contexts/PlayerContext.js';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar({ className }) {
    const playerContext = useContext(PlayerContext);
    const navigate = useNavigate();

    const location = useLocation();

    const gotoPath = (path) => {
        window.scrollTo(0, 0);
        if (!playerContext.isPlayerShowing && location.pathname !== path)
            navigate(path);
    };

    return (
        <nav
            className={`flex tablet:block gap-1 bg-black border-t tablet:border-t-0 tablet:border-r border-slate-900 ${className}`}
        >
            <NavItem
                label='Home'
                iconSrc={homeIcon}
                isActive={location.pathname === '/'}
                onClick={() => gotoPath('/')}
            />
            <NavItem
                label='Search'
                iconSrc={searchIcon}
                isActive={location.pathname === '/search'}
                onClick={() => gotoPath('/search')}
            />
            <NavItem
                label='Playlists'
                iconSrc={playlistIcon}
                isActive={location.pathname === '/playlists'}
                onClick={() => gotoPath('/playlists')}
            />
            <NavItem
                label='About'
                iconSrc={infoIcon}
                isActive={location.pathname === '/about'}
                onClick={() => gotoPath('/about')}
            />
        </nav>
    );
}

export default NavBar;
