import { useState, useEffect, useRef, useCallback } from "react";
import { YTstates } from "../constants.js";

function usePlayerProgressBar(playerState, getCurrentTime, seekTo) {
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

    const handleChange = !seekTo ? null : useCallback((e) => {
        clearInterval(itvID.current);
        let changedValue = Number(e.target.value);
        if (isNaN(changedValue))
            changedValue = 0;
        setValue(changedValue);
    }, [setValue]);

    const handleClick = !seekTo ? null : useCallback((e) => {
        let changedValue = Number(e.target.value);
        if (isNaN(changedValue))
            changedValue = 0;

        seekTo(changedValue, true);
        startUpdateTimeInterval();
    }, [startUpdateTimeInterval]);

    return [value, handleChange, handleClick];
}

export { usePlayerProgressBar };