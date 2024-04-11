import logo from '/logos/xMuzikk.png';
import isMobileDevice from '../utils/isMobileDevice.js';

function Header({ className }) {
    return (
        <header 
            className={`bg-black z-50 flex justify-start border-b border-slate-900 backdrop-blur-md bg-opacity-65 ${className}`}
        >
            <div className={`w-fit h-full p-2.5 flex justify-start items-center cursor-pointer tablet:p-3 active:bg-slate-800 ${!isMobileDevice ? 'hover:bg-slate-900' : ''}`}>
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