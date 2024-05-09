import { useEffect, useRef, useState, useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';

function PlayerPage({ isPlayerShowing, hidePlayer, className }) {
    const containerRef = useRef(null);
    const isFirstRender = useRef(true);
    const { playingMusic } = useContext(PlayerContext) || {};

    const { id, title, thumbnail, duration, uploadTime, channelTitle } = playingMusic || {};

    useEffect(() => {
        isFirstRender.current = true;
    }, []);

    useEffect(() => {
        if (!isFirstRender.current) {
            if (isPlayerShowing) {
                containerRef.current.classList.remove('animate-hide');
                containerRef.current.classList.add('animate-show');
            }
            else {
                containerRef.current.classList.remove('animate-show');
                containerRef.current.classList.add('animate-hide');
            }
        }

        isFirstRender.current = false;
    }, [isPlayerShowing]);

    return (
        <div 
            ref={containerRef}
            className={`bg-black w-dvw h-dvh fixed inset-x-0 flex justify-center tablet:flex-col tablet:px-3 laptop:px-24 tablet:py-14 ${isPlayerShowing ? 'top-0' : 'top-out'} ${className}`}    
        >
            <div className='-z-10 w-full h-full absolute inset-0'>
                <img 
                    src={thumbnail}
                    className='w-full h-full object-cover blur-xl opacity-50 tablet:blur-sm tablet:opacity-65'
                />
            </div>
            <div className='p-10 w-full h-fit max-h-full bg-opacity-45 overflow-y-scroll tablet:bg-white tablet:backdrop-blur-[35px] tablet:bg-opacity-10'>
                
                <div className='flex aspect-[2]'>

                    <div className='aspect-square'>
                        <div className='w-full h-full'>
                            <img 
                                src={thumbnail}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </div>

                    <div className='flex-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias animi ducimus porro, fugit iusto a cumque laborum quod, deleniti alias iure provident veritatis magnam rem magni adipisci aliquam quasi, soluta nemo. Consequatur velit ipsum beatae ullam architecto? Quas aut voluptatum voluptates sequi magnam officiis! Asperiores voluptatem rem quae molestias atque voluptates distinctio sit odit minus doloribus deleniti laudantium sequi quos laboriosam optio pariatur nulla, ducimus ipsam excepturi modi reprehenderit iure? Illum, explicabo provident doloribus ducimus aliquam adipisci quod eveniet labore atque totam quia ullam laudantium dignissimos ipsam sapiente. Quae autem laborum mollitia sit est facilis corporis expedita temporibus, commodi doloribus!
                    </div>

                </div>

                <div className=''>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo tenetur deserunt fugit ipsa dicta, adipisci animi nisi cumque dolor perferendis voluptates facilis voluptas quae, fuga perspiciatis eos voluptatum numquam officiis sint a. Corporis optio cum praesentium natus. Dolores iusto impedit blanditiis neque aliquid hic, modi earum vel magnam praesentium voluptate corrupti corporis recusandae dignissimos perspiciatis. Quidem minus libero ea repellat, itaque illum nisi cum distinctio quisquam officiis quaerat deleniti animi, at, odit corporis velit consequatur dignissimos ex! Modi deserunt quisquam sed eaque iure, veniam id soluta itaque vero neque pariatur! Ratione eum cupiditate qui accusantium, dolor consequuntur accusamus dolore dolores?
                </div>

            </div>
        </div>
    );
}

export default PlayerPage;