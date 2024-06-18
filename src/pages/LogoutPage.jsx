import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import Popover from '../components/ui/Popover.jsx';

import siteIcon from '/logos/wave.png';

import { authService } from "../dataManager/AppwriteService.js";

import { ToastContext } from "../contexts/ToastContext.js";
import { UserContext } from '../contexts/UserContext.js';
import Spinner from "../components/ui/Spinner.jsx";

function LogoutPage() {
    const [logoutPopupShowing, setLogoutPopupShowing] = useState(true);

    const [disabled, setDisabled] = useState(false);

    const { showToast } = useContext(ToastContext);
    const { reloadUser } = useContext(UserContext);

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
                    showToast.info(`You are already logged out`);
                }
                else {
                    console.log(response);
                    showToast.success('Logged out successfully');
                    reloadUser();
                }
            })
            .catch((err) => {
                console.log(err);
                showToast.error(`You are already logged out`);
            })
            .finally(() => {
                setDisabled(false);
                window.history.back();
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
                    className='flex justify-center items-center w-full h-9 my-1.5 text-[17px] font-semibold bg-red-600 rounded-full active:bg-opacity-80 disabled:bg-opacity-50'
                >
                    {
                        disabled ? (
                            <Spinner size={30} />
                        ) : (
                            'Logout'
                        )
                    }
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