import { useEffect, useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";

function App() {
    
    const [isPlayerShowing, setIsPlayerShowing] = useState(window.history.state.player ? true : false);
    const [playingMusicId, setPlayingMusicId] = useState('');

    if (isPlayerShowing)
        document.body.classList.add('disable-scroll');
    else
        document.body.classList.remove('disable-scroll');

    const playMusic = (id) => {
        setPlayingMusicId(id);
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

            <PlayerContext.Provider value={{isPlayerShowing, playMusic}}>
                <Header className='z-header w-full h-header-m fixed top-0 inset-x-0 tablet:h-header'/>
                
                <main className='mt-main-t-m mb-main-b-m tablet:mt-main-t tablet:mb-main-b tablet:ml-main-l'>
                    <Outlet />
                </main>

                <Footer
                    onClick={showPlayer}
                    playingMusicId={playingMusicId}
                    className='z-footer w-full h-footer-m fixed inset-x-0 bottom-footer-b-m tablet:bottom-0 tablet:h-footer' 
                />

                <PlayerPage 
                    isPlayerShowing={isPlayerShowing} 
                    hidePlayer={hidePlayer}
                    className='z-playerpage'
                />

                <NavBar className='z-navbar w-full h-navbar-m tablet:w-navbar tablet:h-full fixed bottom-0 inset-x-0 tablet:left-0 tablet:top-14' />
            </PlayerContext.Provider>
        </>
    );
}

export default App;
