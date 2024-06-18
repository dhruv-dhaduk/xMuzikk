import { useState } from "react";

import Spinner from './ui/Spinner.jsx';

function AsyncSubmitBtn({ children, className, asyncClickHandler, spinnerSize, loadingClassName }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);

        try {
            asyncClickHandler()
                .finally(() => {
                    setIsLoading(false);
                })
        } catch (err) {
            setIsLoading(false);
            console.error(err);
        }
    }

    if (isLoading) {
        return (
            <div className={loadingClassName}>
                <Spinner size={spinnerSize} />
            </div>
        );
    }

    return (
        <button
            className={className}
            onClick={handleClick}
        >
            { children }
        </button>
    );
}

export default AsyncSubmitBtn;