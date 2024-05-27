import { useState, useEffect } from "react";

function usePopUpPage() {
    const [isPageShowing, setIsPageShowing] = useState(window.history.state.popUpPage ? true : false);

    if (isPageShowing)
        document.body.classList.add('disable-scroll');
    else
        document.body.classList.remove('disable-scroll');

    const showPage = () => {
        if (!window.history.state.popUpPage) 
            window.history.pushState({ popUpPage: true }, '');

        if (!isPageShowing)
            setIsPageShowing(true);
    }

    const hidePage = () => {
        if (window.history.state.popUpPage)
            window.history.back();
        
        if (isPageShowing)
            setIsPageShowing(false);
    }

    const popStateHandler = () => {
        if (!window.history.state.popUpPage)
            hidePage();
        else
            showPage();
    }

    useEffect(() => {
        window.addEventListener("popstate", popStateHandler);

        return () => {
            window.removeEventListener("popstate", popStateHandler);
        }
    });

    return [isPageShowing, showPage, hidePage]
}

export { usePopUpPage };