function NavItem({ label, iconSrc, isActive, onClick }) {
    return (
        <div 
            className={`${isActive ? 'main-gradient' : ''} select-none cursor-pointer rounded-lg flex-1 flex flex-col justify-center items-center tablet:my-1 tablet:gap-2 tablet:px-3.5 tablet:py-2.5 tablet:flex-row tablet:justify-start`}
            onClick={onClick}
        >
            <img 
                src={iconSrc}
                alt={label}
                onContextMenu={e => e.preventDefault()}
                draggable={false}
                className='aspect-square w-5 tablet:w-6'
            />

            <p className='font-semibold text-[14px]/[14px] tablet:text-[17px]'>
                {label}
            </p>
        </div>
    );
}

export default NavItem;