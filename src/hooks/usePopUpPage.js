import { useState, useEffect, useRef, useCallback } from 'react';

function usePopUpPage() {
    const popoverRef = useRef(null);

    const [isPageShowing, setIsPageShowing] = useState(
        window.history.state.popUpPage ? true : false
    );

    if (isPageShowing) document.body.classList.add('disable-scroll');
    else document.body.classList.remove('disable-scroll');

    const showPage = useCallback(() => {
        setIsPageShowing(true);
    }, [setIsPageShowing]);

    const hidePage = useCallback(() => {
        setIsPageShowing(false);
    }, [setIsPageShowing]);

    useEffect(() => {
        if (isPageShowing === true) {
            popoverRef.current.showPopover();
            if (!window.history.state.popUpPage)
                window.history.pushState({ popUpPage: true }, '');
        } else if (isPageShowing === false) {
            popoverRef.current.hidePopover();
            if (window.history.state.popUpPage) window.history.back();
        }
    }, [isPageShowing]);

    const changePopoverShowingState = useCallback(
        (e) => {
            if (e.newState === 'open') showPage();
            else if (e.newState === 'closed') hidePage();
        },
        [setIsPageShowing]
    );

    const popStateHandler = () => {
        if (!window.history.state.popUpPage) hidePage();
        else showPage();
    };

    useEffect(() => {
        if (popoverRef.current)
            popoverRef.current.addEventListener(
                'toggle',
                changePopoverShowingState
            );
        return () => {
            if (popoverRef.current)
                popoverRef.current.removeEventListener(
                    'toggle',
                    changePopoverShowingState
                );
        };
    }, [changePopoverShowingState]);

    useEffect(() => {
        window.addEventListener('popstate', popStateHandler);

        return () => {
            window.removeEventListener('popstate', popStateHandler);
        };
    });

    return [isPageShowing, showPage, hidePage, popoverRef];
}

export { usePopUpPage };
