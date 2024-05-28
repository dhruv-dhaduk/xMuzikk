import { useState, useEffect, useRef, useCallback } from "react";
import { YTstates } from "../constants.js";

function usePlayerProgressBar(playerState, getCurrentTime) {
    const [value, setValue] = useState(0);
    const itvID = useRef(-1);

    const startUpdateTimeInterval = useCallback(() => {
        clearInterval(itvID.current);
        itvID.current = setInterval(() => {
            if (!getCurrentTime) {
                return;
            }
            setValue(getCurrentTime());
        }, 350);
    }, [setValue]);

    useEffect(() => {

        return () => {
            clearInterval(itvID.current);
        }
    }, []);

    useEffect(() => {
        if (playerState === YTstates.PLAYING) {
            startUpdateTimeInterval();
        }
        else {
            clearInterval(itvID.current);
        }
    }, [playerState]);

    return value;
}

export { usePlayerProgressBar };