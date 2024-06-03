import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Popover from '../components/ui/Popover.jsx';

import siteIcon from '/logos/wave.png';

import { authService } from "../dataManager/AppwriteService.js";

function LogoutPage() {
    const [logoutPopupShowing, setLogoutPopupShowing] = useState(true);

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (!logoutPopupShowing) {
            window.history.back();
        }
    }, [logoutPopupShowing]);

    const handleLogout = async () => {
        setDisabled(true);

        authService
            .logout()
            .then(({response, error}) => {
                if (error) {
                    console.log(error);
                    alert(`Error : ${error.message}`);
                }
                else {
                    console.log(response);
                    window.history.back();
                }
            })
            .catch((err) => {
                console.log(err);
                alert(`Error : ${err.message}`);
            })
            .finally(() => {
                setDisabled(false);
            });
    }
    
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
                    onClick={handleLogout}
                    disabled={disabled}
                    className='w-full h-9 my-1.5 text-[17px] font-semibold bg-red-600 rounded-full active:bg-opacity-80 disabled:opacity-50'
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