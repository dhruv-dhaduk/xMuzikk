import { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";
import { YTstates } from "./constants.js";

function App() {
    
    const playerRef = useRef({});
    const [isPlayerShowing, setIsPlayerShowing] = useState(window.history.state.player ? true : false);
    const [playingMusic, setPlayingMusic] = useState({});

    if (isPlayerShowing)
        document.body.classList.add('disable-scroll');
    else
        document.body.classList.remove('disable-scroll');

    const playMusic = (item) => {
        setPlayingMusic(item);
    }

    const showPlayer = () => {
        if (!window.history.state.player) 
            window.history.pushState({ player: true }, '');

        if (!isPlayerShowing)
            setIsPlayerShowing(true);
    }

    const hidePlayer = () => {
        if (window.history.state.player)
            window.history.back();
        
        if (isPlayerShowing)
            setIsPlayerShowing(false);
    }

    const popStateHandler = () => {
        if (!window.history.state.player)
            hidePlayer();
        else
            showPlayer();
    }

    useEffect(() => {
        window.addEventListener("popstate", popStateHandler);

        return () => {
            window.removeEventListener("popstate", popStateHandler);
        }
    });

    const getPlayerRef = (passedRef) => {
        playerRef.current = passedRef.current;
    }

    const addStateChangeListener = (fn) => {
        if (typeof(fn) === 'function' && playerRef.current?.addEventListener) {
            playerRef.current.addEventListener('onStateChange', fn);
        }
    }

    const getPlayerState = () => {
        if (playerRef.current?.getPlayerState)
            return playerRef.current.getPlayerState();
        return YTstates.UNSTARTED;
    }

    const getCurrentTime = () => {
        if (playerRef.current?.getCurrentTime) 
            return playerRef.current.getCurrentTime();
        return 0;
    }

    const playpause = () => {
        if (playerRef.current?.getPlayerState) {
            const stat = playerRef.current.getPlayerState();

            if (stat === YTstates.PLAYING) {
                playerRef.current.pauseVideo();
            }
            else if (stat === YTstates.PAUSED) {
                playerRef.current.playVideo();
            }
        }
    }

    return (
        <>  

            <PlayerContext.Provider value={{playingMusic, isPlayerShowing, playMusic}}>
                <Header className='z-header w-full h-header-m tablet:h-header fixed inset-x-0 top-0'/>
                
                <main className='mt-main-t-m tablet:mt-main-t mb-main-b-m tablet:mb-main-b tablet:ml-main-l'>
                    <Outlet />
                </main>

                <Footer
                    onClick={showPlayer}
                    playingMusic={playingMusic}
                    addStateChangeListener={addStateChangeListener}
                    getPlayerState={getPlayerState}
                    getCurrentTime={getCurrentTime}
                    playpause={playpause}
                    className='z-footer w-full h-footer-m tablet:h-footer fixed inset-x-0 bottom-footer-b-m tablet:bottom-0' 
                />

                <PlayerPage 
                    isPlayerShowing={isPlayerShowing} 
                    hidePlayer={hidePlayer}
                    exposePlayerRef={getPlayerRef}
                    className='z-playerpage'
                />

                <NavBar className='z-navbar w-full tablet:w-navbar h-navbar-m tablet:h-full fixed inset-x-0 tablet:top-14 bottom-0 tablet:left-0' />
            </PlayerContext.Provider>
        </>
    );
}

export default App;
