import NavItem from './NavItem';
import homeIcon from '/icons/home.svg';
import heartIcon from '/icons/heart_filled_white.svg';
import playlistIcon from '/icons/playlist.svg';
import infoIcon from '/icons/info.svg';

function NavBar({ className = 'w-full h-12 tablet:w-40 tablet:h-full' }) {
    return (
        <nav className={`bg-black z-30 flex gap-1 border-t border-slate-900 tablet:block tablet:border-t-0 tablet:border-r ${className}`}>
            <NavItem label="Home" iconSrc={homeIcon} isActive={true} />
            <NavItem label="Liked" iconSrc={heartIcon} />
            <NavItem label="Playlists" iconSrc={playlistIcon} />
            <NavItem label="About" iconSrc={infoIcon} />
        </nav>
    );
}

export default NavBar;