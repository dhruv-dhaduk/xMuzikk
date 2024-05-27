function Icon({ imgSrc, className, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`aspect-square cursor-pointer active:scale-[0.8] duration-200 ${className}`}
        >
            <img 
                src={imgSrc}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                className='w-full h-full object-cover'
            />
        </div>
    );
}

export default Icon;