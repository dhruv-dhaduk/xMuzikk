function NavItem({ label, iconSrc, isActive }) {
    return (
        <div className={`${isActive ? 'main-gradient' : ''} rounded-lg flex-1 flex flex-col justify-center items-center tablet:my-1 tablet:gap-2 tablet:px-3.5 tablet:py-2.5 tablet:flex-row tablet:justify-start`}>
            <img 
                src={iconSrc}
                alt={label}
                className='aspect-square w-5 tablet:w-6'
            />

            <p className='font-semibold text-[14px]/[14px] tablet:text-[17px]'>
                {label}
            </p>
        </div>
    );
}

export default NavItem;