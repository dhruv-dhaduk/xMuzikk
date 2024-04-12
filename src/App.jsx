import { useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import PlayerPage from "./pages/PlayerPage.jsx";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";

function App() {
    const [isPlayerShowing, setIsPlayerShowing] = useState(false);

    const showPlayer = () => {
        if (!isPlayerShowing)
            setIsPlayerShowing(true);
    }

    const hidePlayer = () => {
        if (isPlayerShowing)
            setIsPlayerShowing(false);
    }

    return (
        <>  

            <PlayerContext.Provider value={{isPlayerShowing}}>
                <Header className='w-full h-12 fixed top-0 inset-x-0 tablet:h-14'/>
                
                <main className='mt-12 mb-12 tablet:mt-14 tablet:mb-0 tablet:ml-36'>
                    <button 
                        className='bg-white text-black font-bold rounded p-4'
                        onClick={showPlayer}
                    >
                        Show Player
                    </button>
                    <Outlet />
                </main>

                <PlayerPage isPlayerShowing={isPlayerShowing} hidePlayer={hidePlayer} />

                <NavBar className='w-full h-12 tablet:w-36 tablet:h-full fixed bottom-0 inset-x-0 tablet:left-0 tablet:top-14' />
            </PlayerContext.Provider>
        </>
    );
}

export default App;
