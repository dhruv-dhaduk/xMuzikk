import logo from '/logos/xMuzikk.png';

function Header({ className = 'h-12 tablet:h-14' }) {
    return (
        <header className={`bg-black flex justify-start border-b border-slate-900 backdrop-blur-md bg-opacity-65 ${className}`}>
            <div className='w-fit h-full p-2.5 flex justify-start items-center tablet:p-3'>
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