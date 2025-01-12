import { useEffect, useRef } from 'react';

import closeIcon from '/icons/close.svg';

import { Droppable, Draggable } from '@hello-pangea/dnd';

function Queue({ queue, playingMusic, playFromQueueAt, removeFromQueue }) {
    return (
        <Droppable droppableId='queue'>
            {(provided) => (
                <div
                    className='flex-1 w-full overflow-y-auto'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {queue.map((musicItem, i) => (
                        <Draggable
                            key={`queue_item_${musicItem.id}`}
                            draggableId={`queue_item_${musicItem.id}`}
                            index={i}
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                >
                                    <QueueItem
                                        music={musicItem}
                                        isPlaying={
                                            playingMusic.id === musicItem.id
                                        }
                                        play={() => playFromQueueAt(i)}
                                        remove={() =>
                                            removeFromQueue(musicItem.id)
                                        }
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
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
                    onContextMenu={(e) => e.preventDefault()}
                    className='w-full h-full object-cover'
                />
            </div>

            <div className='flex-1 flex flex-col justify-evenly'>
                <p className='line-clamp-1'>{music.title}</p>
                <p className='line-clamp-1 text-xs text-stone-300'>
                    {music.channelTitle}
                </p>
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    remove();
                }}
                className={`aspect-square flex justify-center items-center cursor-pointer active:scale-[0.8] duration-200 w-9 p-1.5 bg-whit bg-opacity-25`}
            >
                <img
                    src={closeIcon}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className='w-full'
                />
            </div>
        </div>
    );
}

export default Queue;
