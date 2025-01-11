import Popover from "../components/ui/Popover.jsx";

function PlayerPage({ isPlayerShowing, showPlayer, hidePlayer, popoverRef }) {
    return (
        <div
            popover='auto'
            ref={popoverRef}
            className='backdrop:bg-black backdrop:opacity-80 w-72 max-w-[90%] max-h-[90%] p-4 bg-black text-white border border-white border-opacity-30 rounded-2xl'
        >
            <button
                className='w-full h-9 my-1.5 text-[17px] font-semibold bg-white text-black rounded-full active:bg-opacity-80'
                onClick={hidePlayer}
            >
                Cancel
            </button>
        </div>
    )
}

export default PlayerPage;