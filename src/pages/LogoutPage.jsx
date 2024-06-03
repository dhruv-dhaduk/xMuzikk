import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Popover from '../components/ui/Popover.jsx';

import siteIcon from '/logos/wave.png';

function LogoutPage() {
    const [logoutPopupShowing, setLogoutPopupShowing] = useState(true);

    useEffect(() => {
        if (!logoutPopupShowing) {
            window.history.back();
        }
    }, [logoutPopupShowing]);
    
    return (
        <div>
            <Popover
                popoverShowing={logoutPopupShowing}
                setPopoverShowing={setLogoutPopupShowing}
                className='backdrop:bg-black backdrop:opacity-80 w-72 max-w-[90%] max-h-[90%] p-4 bg-black text-white border border-white border-opacity-30 rounded-2xl'
            >
                <div className='flex justify-center mb-4'>
                    <Link
                        to='/'
                    >
                        <img
                            src={siteIcon}
                            onContextMenu={e => e.preventDefault()}
                            draggable={false}
                            className='w-8'
                        />
                    </Link>
                </div>

                <h1 className='mb-4 text-lg font-semibold select-none'>
                    Logout from xMuzikk ?
                </h1>

                <button
                    className='w-full h-9 my-1.5 text-[17px] font-semibold bg-red-600 rounded-full active:bg-opacity-80'
                >
                    Logout
                </button>

                <button
                    className='w-full h-9 my-1.5 text-[17px] font-semibold bg-white text-black rounded-full active:bg-opacity-80'
                    onClick={() => setLogoutPopupShowing(false)}
                >
                    Cancel
                </button>
            </Popover>
        </div>
    )
}

export default LogoutPage;