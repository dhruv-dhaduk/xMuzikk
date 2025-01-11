import { useId, useRef } from 'react';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer.jsx';
import PlayerPage from './pages/PlayerPage.jsx';

import { Outlet } from 'react-router-dom';

import { PlayerContext } from './contexts/PlayerContext.js';
import { ToastContext } from './contexts/ToastContext.js';
import { UserContext } from './contexts/UserContext.js';
import { DragDropCallbackContext } from './contexts/DragDropCallbackContext.js';

import { useYT } from './hooks/useYT.js';
import { usePopUpPage } from './hooks/usePopUpPage.js';
import { useUser } from './hooks/useUser.js';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import { DragDropContext } from '@hello-pangea/dnd';

function App() {
    const [isPlayerShowing, showPlayer, hidePlayer, popoverRef] = usePopUpPage();
    const playerElementID = useId();
    const {
        isYtApiLoaded,
        playerState,
        playerRef,
        playingMusic,
        queue,
        playManager,
        looping,
        nextLoopingOption,
        moveQueueItem,
        refreshPlayer,
    } = useYT(playerElementID);

    const [user, reloadUser] = useUser();

    const dragDropCallbacks = useRef(new Map());

    const showToast = {
        default: (content, options) =>
            toast(content, { draggable: true, ...options }),
        info: (content, options) =>
            toast.info(content, { draggable: true, ...options }),
        success: (content, options) =>
            toast.success(content, { draggable: true, ...options }),
        warn: (content, options) =>
            toast.warn(content, { draggable: true, ...options }),
        error: (content, options) =>
            toast.error(content, { draggable: true, ...options }),
    };

    const handleOnDragEnd = (result) => {
        if (
            result.source.droppableId === 'queue' &&
            result.destination.droppableId === 'queue'
        ) {
            moveQueueItem(result.source.index, result.destination.index);
        }

        if (result.source.droppableId === result.destination.droppableId) {
            const callback = dragDropCallbacks.current.get(
                result.destination.droppableId
            );

            if (callback) {
                callback(result);
            }
        }
    };

    const setDragDropCallback = (droppableId, callback) => {
        dragDropCallbacks.current.set(droppableId, callback);
    };

    return (
        <>
            <UserContext.Provider value={{ user, reloadUser }}>
                <ToastContext.Provider value={{ showToast }}>
                    <PlayerContext.Provider
                        value={{
                            isPlayerShowing,
                            showPlayer,
                            isYtApiLoaded,
                            playerState,
                            playerRef,
                            playingMusic,
                            queue,
                            playManager,
                            looping,
                            nextLoopingOption,
                            refreshPlayer,
                        }}
                    >
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <DragDropCallbackContext.Provider
                                value={{ setDragDropCallback }}
                            >
                                <Header className='z-header w-full h-header-m tablet:h-header fixed inset-x-0 top-0' />

                                <main className='mt-main-t-m tablet:mt-main-t mb-main-b-m tablet:mb-main-b tablet:ml-main-l'>
                                    <Outlet />
                                </main>

                                <Footer
                                    onClick={() => {
                                        if (!isPlayerShowing)
                                            showPlayer();
                                    }}
                                    playPreviousMusic={
                                        playManager.playPreviousMusic
                                    }
                                    playNextMusic={playManager.playNextMusic}
                                    className='z-footer w-full h-footer-m tablet:h-footer fixed inset-x-0 bottom-footer-b-m tablet:bottom-0'
                                />

                                <PlayerPage
                                    isPlayerShowing={isPlayerShowing}
                                    showPlayer={showPlayer}
                                    hidePlayer={hidePlayer}
                                    popoverRef={popoverRef}
                                    playerElementID={playerElementID}
                                />

                                <NavBar className='z-navbar w-full tablet:w-navbar h-navbar-m tablet:h-full fixed inset-x-0 tablet:top-14 bottom-0 tablet:left-0' />
                                
                            </DragDropCallbackContext.Provider>
                        </DragDropContext>
                    </PlayerContext.Provider>
                </ToastContext.Provider>

                <ToastContainer />
            </UserContext.Provider>
        </>
    );
}

export default App;
