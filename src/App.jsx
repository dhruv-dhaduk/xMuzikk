import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
    return (
        <>  
            <Header className='w-full h-12 fixed top-0 inset-x-0 tablet:h-14'/>
            
            <main className='mt-12 mb-12 tablet:mt-14 tablet:mb-0 tablet:ml-40'>
                <div>xMuzikk</div>
            </main>

            <NavBar className='w-full h-12 tablet:w-40 tablet:h-full fixed bottom-0 inset-x-0 tablet:left-0 tablet:top-14' />
        </>
    );
}

export default App;
