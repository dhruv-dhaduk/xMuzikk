import { useEffect, useRef } from "react";
import { useState } from "react";

import { getMusicDetails } from '../../dataManager/index.js';

import closeIcon from '/icons/close.svg';
import Icon from "./Icon.jsx";

import { Droppable, Draggable } from '@hello-pangea/dnd';

function Queue({ musicIDs, queueVisible, setQueueVisible, playingMusic, playFromQueueAt, removeFromQueue }) {
    const [musicDetails, setMusicDetails] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateMusicDetails = async () => {
            
            const existingMusic = musicDetails.map(music => music.id);
            const newMusicIDs = musicIDs.filter(id => !existingMusic.includes(id));

            const response = await getMusicDetails(newMusicIDs);

            const warehouse = new Map();

            musicDetails.forEach(music => {
                warehouse.set(music.id, music);
            });
            response.forEach(music => {
                warehouse.set(music.id, music);
            });

            setMusicDetails(
                musicIDs.map(id => {
                    const music = warehouse.get(id);
                    if (music) 
                        return music;
                    else
                        return {id, notFound: true};
                })
            );
        }

        updateMusicDetails();
    }, [musicIDs]);

    useEffect(() => {
        containerRef.current.classList.remove('animate-blink-once-1s');

        if (queueVisible) {
            void containerRef.offsetWidth;
            containerRef.current.classList.add('animate-blink-once-1s');
        }

    }, [queueVisible]);

    return (
        <div
            className={`${queueVisible ? '' : 'hidden'} absolute flex flex-col justify-start w-full h-full overflow-hidden bg-black rounded-2xl`}
            ref={containerRef}
        >
            <div
                className='flex-none flex justify-between items-center h-14 pl-4 pr-2 border-b border-stone-600'
            >
                <p className='text-xl font-bold'>
                    In Queue
                </p>

                <Icon
                    onClick={() => setQueueVisible(false)}
                    imgSrc={closeIcon}
                    className='w-10 p-1.5 rounded-full bg-white bg-opacity-25'
                />
            </div>

            <Droppable droppableId='queue'>
                {(provided) => (
                    <div
                        className='flex-1 w-full overflow-y-auto'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        { 
                            musicDetails.map((musicItem, i) => (
                                <Draggable key={musicItem.id} draggableId={musicItem.id} index={i}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                            <QueueItem
                                                music={musicItem}
                                                isPlaying={playingMusic.id === musicItem.id}
                                                play={() => playFromQueueAt(i)}
                                                remove={() => removeFromQueue(musicItem.id)}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }

                        { provided.placeholder }
                    </div>
                )}        
            </Droppable>

        </div>
    );
}

function QueueItem({ music, isPlaying, play, remove }) {
    return (
        <div
            className={`flex justify-start items-center h-16 gap-2 px-2 py-1.5 bg-transparent from-primary-light-35 to-primary-dark-35 rounded-lg cursor-pointer ${isPlaying ? 'bg-gradient-to-r' : ''}`}
            onClick={play}
        >
            <div className='flex-none h-full aspect-square rounded-lg overflow-hidden'>
                <img
                    src={music.thumbnail}
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                    className='w-full h-full object-cover'
                />
            </div>

            <div className='flex-1 flex flex-col justify-evenly'>
                <p className='line-clamp-1'>{ music.title }</p>
                <p className='line-clamp-1 text-xs text-stone-300'>{ music.channelTitle }</p>
            </div>

            <Icon
                imgSrc={closeIcon}
                className='w-9 p-1.5 bg-whit bg-opacity-25'
                onClick={e => { e.stopPropagation(); remove(); }}
            />
        </div>
    );
}

export default Queue;