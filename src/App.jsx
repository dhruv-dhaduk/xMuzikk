import { useId } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";
import { useYT } from "./hooks/useYT.js";
import { usePopUpPage } from "./hooks/usePopUpPage.js";

function App() {
    
    const [isPlayerShowing, showPlayer, hidePlayer] = usePopUpPage();
    const playerElementID = useId();
    const {
        isYtApiLoaded, 
        playerState, 
        playerRef, 
        playingMusic, 
        playMusic,
        looping,
        nextLoopingOption
    } = useYT(playerElementID);

    return (
        <>  

            <PlayerContext.Provider value={{isPlayerShowing, isYtApiLoaded, playerState, playerRef, playingMusic, playMusic, looping, nextLoopingOption}}>
                <Header className='z-header w-full h-header-m tablet:h-header fixed inset-x-0 top-0'/>
                
                <main className='mt-main-t-m tablet:mt-main-t mb-main-b-m tablet:mb-main-b tablet:ml-main-l'>
                    <Outlet />
                </main>

                <Footer
                    onClick={showPlayer}
                    className='z-footer w-full h-footer-m tablet:h-footer fixed inset-x-0 bottom-footer-b-m tablet:bottom-0' 
                />

                <PlayerPage 
                    isPlayerShowing={isPlayerShowing}
                    playerElementID={playerElementID}
                    hidePlayer={hidePlayer}
                    className='z-playerpage'
                />

                <NavBar className='z-navbar w-full tablet:w-navbar h-navbar-m tablet:h-full fixed inset-x-0 tablet:top-14 bottom-0 tablet:left-0' />
            </PlayerContext.Provider>
            
        </>
    );
}

export default App;
