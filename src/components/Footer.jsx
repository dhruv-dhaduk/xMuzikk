import playIcon from '/icons/play.svg';
import pauseIcon from '/icons/pause.svg';
import previousIcon from '/icons/previous.svg';
import nextIcon from '/icons/next.svg';

import {
    convertUploadTimeFormat,
    convertDurationFormat,
    getDurationFromISO,
} from '../utils/converters.js';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext.js';
import { YTstates } from '../constants.js';

import { usePlayerProgressBar } from '../hooks/usePlayerProgressBar.js';

function Footer({ className, onClick, playPreviousMusic, playNextMusic }) {
    const { playerState, playingMusic, playerRef } = useContext(PlayerContext);

    const [progressBarValue] = usePlayerProgressBar(playerState, () => {
        if (playerRef?.current?.getCurrentTime)
            return playerRef?.current?.getCurrentTime();
        else return 0;
    });

    if (!playingMusic || !playingMusic.id) {
        return null;
    }

    return (
        <footer
            onClick={onClick}
            className={`flex flex-col tablet:flex-col-reverse bg-black shadow-footer overflow-hidden rounded-full tablet:rounded-none cursor-pointer select-none ${className}`}
        >
            <img
                src={playingMusic.thumbnail}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className='-z-10 w-full h-full object-cover absolute inset-0 blur-xl tablet:blur-2xl opacity-50'
            />

            <div className='flex-1 flex items-center pl-6 pr-2.5 tablet:px-4'>
                <div className='w-footer-thmb-m tablet:w-footer-thmb h-footer-thmb-m tablet:h-footer-thmb'>
                    <img
                        src={playingMusic.thumbnail}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className='w-full h-full object-cover rounded-md'
                    />
                </div>

                <div className='flex-1 mx-2'>
                    <p className='tablet:text-lg font-bold line-clamp-1'>
                        {playingMusic.title}
                    </p>

                    <p className='text-xs tablet:text-sm'>
                        <span> {playingMusic.channelTitle} </span>
                        <span className='hidden tablet:inline mx-1 font-bold'>
                            {' '}
                            ·{' '}
                        </span>
                        <span className='hidden tablet:inline'>
                            {' '}
                            {convertUploadTimeFormat(
                                playingMusic.uploadTime
                            )}{' '}
                        </span>
                        <span className='hidden tablet:inline mx-1 font-bold'>
                            {' '}
                            ·{' '}
                        </span>
                        <span className='hidden tablet:inline'>
                            {' '}
                            {convertDurationFormat(progressBarValue)}{' '}
                            <span className='font-bold'>/</span>{' '}
                            {convertDurationFormat(playingMusic.duration)}{' '}
                        </span>
                    </p>
                </div>

                <div className='flex justify-center items-center gap-2'>
                    <Icon
                        onClick={playPreviousMusic}
                        iconSrc={previousIcon}
                        className='tablet:w-12 tablet:h-12 hidden tablet:block tablet:p-3 rounded-full'
                    />
                    <Icon
                        onClick={playerRef.current.playpause}
                        iconSrc={
                            playerState === YTstates.BUFFERING ||
                            playerState === YTstates.PLAYING
                                ? pauseIcon
                                : playIcon
                        }
                        className={`w-11 tablet:w-12 h-11 tablet:h-12 p-3 tablet:p-3.5 bg-white bg-opacity-25 rounded-full ${playerState === YTstates.BUFFERING ? 'animate-blink' : ''}`}
                    />
                    <Icon
                        onClick={playNextMusic}
                        iconSrc={nextIcon}
                        className='tablet:w-12 tablet:h-12 hidden tablet:block tablet:p-3 rounded-full'
                    />
                </div>
            </div>

            <FooterProgressBar
                value={progressBarValue}
                duration={playingMusic.duration}
            />
        </footer>
    );
}

function FooterProgressBar({ value, duration }) {
    return (
        <progress
            min={0}
            max={getDurationFromISO(duration)}
            value={value}
            className='footer-progressbar flex-none w-full h-1 tablet:h-1.5'
        />
    );
}

function Icon({ iconSrc, className, onClick = () => {} }) {
    return (
        <div
            className={`flex justify-center items-center cursor-pointer active:scale-[0.8] duration-200 ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <img
                src={iconSrc}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className='w-full h-full'
            />
        </div>
    );
}

export default Footer;
