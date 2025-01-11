function Icon({ imgSrc, className, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`aspect-square flex justify-center items-center cursor-pointer active:scale-[0.8] duration-200 ${className}`}
        >
            <img
                src={imgSrc}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className='w-full'
            />
        </div>
    );
}

export default Icon;
