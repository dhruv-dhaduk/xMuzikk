function NavItem({ label, iconSrc, isActive, onClick }) {
    return (
        <div
            className={`flex-1 flex flex-col tablet:flex-row justify-center tablet:justify-start items-center tablet:gap-2 tablet:my-1 tablet:px-3.5 tablet:py-2.5 rounded-lg cursor-pointer select-none ${isActive ? 'main-gradient' : ''}`}
            onClick={onClick}
        >
            <img
                src={iconSrc}
                alt={label}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                className='w-5 tablet:w-6 aspect-square'
            />

            <p className='text-[14px]/[14px] tablet:text-[17px] font-semibold'>
                {label}
            </p>
        </div>
    );
}

export default NavItem;
