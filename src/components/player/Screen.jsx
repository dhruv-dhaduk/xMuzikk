function Screen({ thumbnail, playerElementID, isYtApiLoaded }) {
    return (
        <div className='flex-none tablet:flex-initial aspect-square'>
            <div className='w-full h-full flex justify-center relative overflow-hidden bg-slate-700 rounded-2xl'>
                <div className='w-full h-full absolute inset-0'>
                    <img 
                        src={thumbnail}
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                        className={`w-full h-full object-cover opacity-0`}
                    />
                </div>

                <div className='h-full aspect-video'>
                    <div
                        id={playerElementID}
                        className='w-full h-full pointer-events-none'
                    >
                        { !isYtApiLoaded ? "YouTube iframe api is not loaded yet. Please refresh the page if it takes more time." : "" }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Screen;