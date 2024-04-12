import { useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";

function App() {
    const [isPlayerShowing, setIsPlayerShowing] = useState(false);

    return (
        <>  

            <PlayerContext.Provider value={{isPlayerShowing}}>
                <Header className='w-full h-12 fixed top-0 inset-x-0 tablet:h-14'/>
                
                <main className='mt-12 mb-12 tablet:mt-14 tablet:mb-0 tablet:ml-36'>
                    <Outlet />
                </main>

                <NavBar className='w-full h-12 tablet:w-36 tablet:h-full fixed bottom-0 inset-x-0 tablet:left-0 tablet:top-14' />
            </PlayerContext.Provider>
        </>
    );
}

export default App;
