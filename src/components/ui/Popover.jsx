import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function Popover({ popoverShowing, setPopoverShowing, children, className }) {
    const popoverRef = useRef(null);

    useEffect(() => {
        if (popoverShowing === true) popoverRef.current.showPopover();
        else if (popoverShowing === false) popoverRef.current.hidePopover();
    }, [popoverShowing]);

    const changePopoverShowingState = useCallback(
        (e) => {
            if (e.newState === 'open') setPopoverShowing(true);
            else if (e.newState === 'closed') setPopoverShowing(false);
        },
        [setPopoverShowing]
    );

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

    return (
        <div popover='auto' ref={popoverRef} className={className}>
            {children}
        </div>
    );
}

export default Popover;
