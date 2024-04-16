import { useEffect, useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import PlayerPage from "./pages/PlayerPage.jsx";

import { Outlet } from "react-router-dom";

import { PlayerContext } from "./contexts/PlayerContext.js";

import { AppwriteService } from "./dataManager/appwriteService.js";
const appwriteService = new AppwriteService();

function App() {
    const testFunction = async () => {
        const response = await appwriteService.fetchRecommendation();
        window.data = response;
        
        let allIDs = [];

        for (const key in window.data) {
            allIDs = allIDs.concat(...window.data[key].map((item) => item.ids));
        }

        window.allIDs = allIDs;
        
        window.dataDetails = await appwriteService.fetchDetails(allIDs);

        for (const key in window.data) {
            for (const item of window.data[key]) {
                const details = item.ids.map((id) => window.dataDetails.get(id));
                item.details = details;
            }
        }
    }

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
                
                <main className='mt-12 mb-12 tablet:mt-14 tablet:mb-0 tablet:ml-36'>
                    <button 
                        className='bg-white text-black font-bold rounded p-4'
                        onClick={showPlayer}
                    >
                        Show Player
                    </button>
                    <button 
                        className='bg-white text-black font-bold rounded p-4'
                        onClick={testFunction}
                    >
                        Test Button
                    </button>
                    <Outlet />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus obcaecati odit fugiat, vel quia beatae rerum tempora molestias veritatis molestiae nisi excepturi dolore doloremque incidunt fugit numquam quam qui necessitatibus autem eveniet. Error quae odit aspernatur ullam blanditiis. Nisi officia commodi possimus ipsum doloribus, mollitia repudiandae nemo amet, ea minus vel quae placeat, harum omnis libero quibusdam aliquam. Non delectus ullam earum mollitia repellendus, id enim blanditiis officiis. Necessitatibus aut consectetur iure ea? Explicabo facere velit excepturi, perspiciatis distinctio incidunt voluptate voluptatum accusamus aspernatur commodi saepe perferendis quo labore nulla accusantium placeat sed corrupti totam ullam ipsa itaque! Eligendi, nam, accusantium esse expedita dolores animi nulla laboriosam atque soluta dicta culpa quos odio commodi ratione perferendis ad exercitationem quasi officia sapiente ipsa vero. Quidem consequatur nihil, reiciendis labore doloremque necessitatibus id tenetur? Possimus iste perferendis ab eligendi voluptatibus repellat quo sed aut. Molestiae dicta unde doloribus cum accusantium, fugit beatae quam possimus sint laborum reprehenderit temporibus rerum quidem soluta at placeat ipsam autem distinctio nemo non ratione? Facere cumque nobis dolores, ipsum architecto sint? Veritatis in molestias dolore corrupti quaerat! Ex provident blanditiis aut modi in libero quaerat officiis, iure maiores quae laborum velit ea recusandae fuga dolorum quasi quidem iusto sed. Voluptatem deleniti, perferendis, molestias eius reiciendis numquam in possimus repellat pariatur rerum tenetur, ut odio saepe odit provident autem eligendi. Nisi aperiam omnis dolores quas mollitia modi ducimus. Expedita repudiandae animi voluptatum? Unde, laudantium. Cumque possimus tempore sequi cupiditate quo dolorem, praesentium voluptatibus quibusdam amet rerum nulla ea eveniet itaque qui doloribus iste, corrupti maxime odio perspiciatis, reprehenderit dolorum libero nisi? Ipsam sed cumque maxime est illo aliquid consequuntur voluptatum ex ad, laboriosam hic quae amet voluptate vero aperiam sunt nobis, cupiditate eius magnam quisquam enim necessitatibus. Quaerat soluta cum nesciunt sapiente ducimus quasi corrupti assumenda tenetur atque numquam similique rerum iste sit, earum eligendi officiis dolorum dolore dolores facere asperiores praesentium. Quae, corporis! Nemo minima corrupti quis dignissimos fugiat repellendus beatae est inventore suscipit quisquam. Quos, dolores, incidunt, atque sunt numquam libero nobis inventore ex officia quas dolorem aspernatur error similique saepe? Illo, natus harum et dolor quidem, nostrum soluta repellendus nam assumenda accusantium cupiditate labore asperiores dolorum voluptates ut placeat sint aut perferendis doloribus. Impedit neque perspiciatis molestias rem eveniet placeat accusantium laboriosam, adipisci, nulla recusandae corporis eius aperiam esse aliquam cumque assumenda, vero accusamus quam facilis similique dignissimos eligendi odio mollitia tenetur! Odit optio officia voluptas nisi mollitia obcaecati temporibus recusandae soluta, ratione, voluptates laboriosam veritatis quo neque! Vero earum adipisci libero voluptatem quaerat ipsam. Exercitationem nisi aperiam repellat at fugiat, laudantium aliquid magnam vitae. Consequatur, vitae hic. Fugit nemo, voluptate unde ipsa maiores, labore totam fugiat ex error repellat dolores sapiente laborum officiis facere inventore? Possimus minima, natus excepturi consectetur perferendis quis esse aliquid dolore harum, totam odio, quas asperiores nostrum? Amet cupiditate recusandae maxime quasi modi aliquam, ipsum perspiciatis quia asperiores illum corrupti? Tenetur nesciunt aperiam perspiciatis voluptates, non corrupti recusandae magni harum repudiandae ab commodi facilis, modi facere numquam tempore expedita minima voluptatum ex asperiores quam error. Nemo hic consectetur recusandae impedit exercitationem neque? Repellendus labore, ullam atque illum recusandae quia aliquid consectetur, quas, dicta illo maiores ratione deleniti est velit neque. Inventore iure ex, sint suscipit repudiandae ipsam tenetur ratione accusamus ipsum corrupti et dicta, consectetur eos neque architecto necessitatibus, quis doloremque ea fugiat nostrum id optio sed aliquam totam. Molestiae est accusantium eius numquam? Et laboriosam voluptatum ipsam? Eveniet nemo alias necessitatibus. Repudiandae dicta suscipit impedit atque aut? Quasi iure cum porro rerum labore possimus officiis, sapiente consectetur ullam voluptate autem. Hic, placeat. Voluptatum quia laboriosam, facilis molestias ipsa consequatur, voluptate nobis cupiditate saepe, voluptatem officiis ea beatae aliquam praesentium sed aut perspiciatis tempora consectetur doloremque possimus inventore in molestiae illum. Laboriosam nisi repellendus tempore. Odio veritatis optio asperiores expedita, commodi ea corporis eos necessitatibus enim, eaque soluta culpa. Sunt, impedit quas! Consectetur esse soluta assumenda tempore aut eveniet doloribus quibusdam, fuga amet perspiciatis, ea sit natus quidem deleniti harum laborum voluptate explicabo vel commodi nulla ut magni, voluptatum similique mollitia. Nulla impedit temporibus quasi dolorum sit voluptatibus enim reprehenderit nisi ea esse omnis, deserunt unde animi neque necessitatibus quas minima, laboriosam libero iusto iure! A assumenda, libero, perferendis vero, quasi praesentium labore earum deleniti beatae mollitia amet veritatis vel ut quibusdam! Molestiae quod et molestias perspiciatis! Eum maxime accusamus eius, itaque neque quidem eligendi ipsa eaque deserunt repellat quos laboriosam voluptatem? Non necessitatibus laudantium hic eum eius labore itaque! Vel id magni, ipsam, vitae accusantium dicta accusamus officiis architecto, provident mollitia ex consequatur fugiat! Alias aliquam porro, rerum cum, laudantium quae magnam culpa commodi atque natus nihil aliquid eum cumque? Aliquam eum aut esse, nobis autem ab omnis blanditiis vero. In molestias dolorem, distinctio quos fugiat magni doloremque tempore eligendi delectus incidunt sint cupiditate quo, reiciendis reprehenderit iusto assumenda vel architecto? Quod soluta odit molestias sint! Assumenda, temporibus minima ut, qui vero fugiat perspiciatis, unde consequuntur iste animi officiis reprehenderit sunt ipsam inventore odio voluptatibus consequatur sequi quaerat repudiandae reiciendis? Accusamus aspernatur assumenda eveniet laudantium voluptatem. Cum natus, sit explicabo quibusdam nesciunt est, sed eligendi iure cupiditate doloribus eveniet soluta officiis optio eum, voluptate tempore? Voluptatem, itaque numquam alias dignissimos quas explicabo! Ut cum corporis quaerat laboriosam molestiae iste tempora ratione blanditiis repudiandae a. Nam distinctio, sapiente ipsam doloremque maxime sint aliquid! Sunt aliquam quis provident temporibus cupiditate neque voluptas ratione eligendi quo ex odit optio doloremque architecto vero repudiandae aperiam beatae corporis illum, molestias exercitationem debitis? Porro sed quia saepe itaque illum, cum eligendi ratione distinctio expedita voluptatibus doloremque nulla ipsam, blanditiis velit dolorum, eos laborum quidem est! Labore nesciunt aspernatur neque beatae ipsam minus quas sequi atque facilis, rerum odit quo natus tempora similique illum nulla quasi voluptatibus ea. Autem in, quae quam cumque aspernatur expedita aliquam voluptatibus ut nulla itaque eaque, repudiandae cupiditate quidem facilis corrupti delectus dicta, ipsum culpa recusandae deleniti omnis pariatur iusto minima. Minima voluptates quasi nam odit consequuntur, optio asperiores voluptatem, debitis quaerat, totam accusamus a distinctio laboriosam inventore tenetur iusto voluptatibus?
                </main>

                <PlayerPage isPlayerShowing={isPlayerShowing} hidePlayer={hidePlayer} />

                <NavBar className='w-full h-12 tablet:w-36 tablet:h-full fixed bottom-0 inset-x-0 tablet:left-0 tablet:top-14' />
            </PlayerContext.Provider>
        </>
    );
}

export default App;
