import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { 
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route 
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import PlaylistsPage from "./pages/PlaylistsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";
import MusicItemPage from "./pages/MusicItemPage.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import SavedPlaylists from './components/playlist/SavedPlaylists.jsx';
import OwnedPlaylists from './components/playlist/OwnedPlaylists.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<HomePage />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='logout' element={<LogoutPage />} />
            <Route path='searchresults/:documentId' element={<SearchResultsPage />} />
            <Route path='music/:id' element={<MusicItemPage />} />
            <Route path='playlists' element={<PlaylistsPage />} />
            <Route path='playlists/saved' element={<SavedPlaylists />} />
            <Route path='playlists/me' element={<OwnedPlaylists />} />
            <Route path='playlist/:documentId' element={<PlaylistPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
