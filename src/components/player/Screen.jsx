function Screen({ thumbnail }) {
    return (
        <div
            className='w-full h-full flex justify-center relative overflow-hidden bg-slate-700 rounded-2xl'
        >
            <div className='w-full h-full absolute inset-0'>
                <img
                    src={thumbnail}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`w-full h-full object-cover`}
                />
            </div>

            <div className='h-full aspect-video'>
                <div
                    className='w-full h-full pointer-events-none'
                >
                    {!false
                        ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <p className='w-44 font-bold'>YouTube iframe api is not loaded yet. Please refresh the page if it takes more time.</p>
                            </div>
                        )
                        : ''}
                </div>
            </div>
        </div>
    )
}

export default Screen;