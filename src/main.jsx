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
import LikedPage from "./pages/LikedPage.jsx";
import PlaylistsPage from "./pages/PlaylistsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<HomePage />} />
            <Route path='liked' element={<LikedPage />} />
            <Route path='playlists' element={<PlaylistsPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
