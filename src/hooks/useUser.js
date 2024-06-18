import { useState, useCallback, useEffect } from "react";

import { authService } from "../dataManager/AppwriteService.js";

function useUser() {
    const [user, setUser] = useState(undefined);

    const fetchUser = useCallback(() => {
        setUser(undefined);

        authService
            .getAccountDetails()
            .then(({ response }) => {
                if (!response) {
                    setUser(null);
                }
                else {
                    setUser(response);
                }
            })
            .catch((err) => {
                console.error(err);
                setUser(null);
            })
    }, [setUser]);

    useEffect(fetchUser, []);

    return [user, fetchUser];
}

export { useUser };