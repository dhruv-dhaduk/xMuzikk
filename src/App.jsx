import { useEffect, useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";

function App() {
    
    const [isPlayerShowing, setIsPlayerShowing] = useState(window.history.state.player ? true : false);

    if (isPlayerShowing)
        document.body.classList.add('disable-scroll');
    else
        document.body.classList.remove('disable-scroll');

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

            <PlayerContext.Provider value={{isPlayerShowing}}>
                <Header className='w-full h-12 fixed top-0 inset-x-0 tablet:h-14'/>
                
                <main className='mt-12 mb-32 tablet:mt-14 tablet:mb-[4.5rem] tablet:ml-36'>
                    <Outlet />
                </main>

                <Footer
                    onClick={showPlayer}
                    className='z-40 w-full h-16 fixed inset-x-0 bottom-14 tablet:bottom-0 tablet:h-[4.5rem]' 
                />

                <PlayerPage isPlayerShowing={isPlayerShowing} hidePlayer={hidePlayer} />

                <NavBar className='w-full h-12 tablet:w-36 tablet:h-full fixed bottom-0 inset-x-0 tablet:left-0 tablet:top-14' />
            </PlayerContext.Provider>
        </>
    );
}

export default App;
