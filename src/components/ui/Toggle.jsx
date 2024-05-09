function Toggle({ isActive, className = 'h-10' }) {
    return (
        <div className={`aspect-[1.8] p-1 flex rounded-full ${isActive ? 'justify-end bg-white' : 'justify-start bg-black'} ${className}`}>
            <div className={`aspect-square h-full rounded-full ${isActive ? 'bg-black' : 'bg-white'}`}></div>
        </div>
    );
}

export default Toggle;