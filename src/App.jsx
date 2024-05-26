import { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";
import { YTstates } from "./constants.js";

function App() {
    
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
                    className='z-footer w-full h-footer-m tablet:h-footer fixed inset-x-0 bottom-footer-b-m tablet:bottom-0' 
                />

                <PlayerPage 
                    isPlayerShowing={isPlayerShowing} 
                    hidePlayer={hidePlayer}
                    className='z-playerpage'
                />

                <NavBar className='z-navbar w-full tablet:w-navbar h-navbar-m tablet:h-full fixed inset-x-0 tablet:top-14 bottom-0 tablet:left-0' />
            </PlayerContext.Provider>
        </>
    );
}

export default App;
