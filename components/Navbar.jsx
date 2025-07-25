'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Bars3BottomRightIcon, PlusIcon } from '@heroicons/react/24/outline';

const Navbar = () => {

    const router = useRouter();

    const [chevronUp, setChevronUp] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [width, setWidth] = useState(0);
    const [upload, setUpload] = useState(false)

    const handleiconRotate = () => {
        setChevronUp(!chevronUp);
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /*useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 50);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);*/

    const handleinnerUpload = () => {
        setUpload(!upload)
    }

    return (
        <div className={` ${scrolled ? 'top-0' : ''} flex gap-6 items-center ${width < 1140 ? 'justify-between w-full' : ''} z-20`}>
            <div onClick={() => router.push('/')} className={`flex transition-all duration-200 ease-linear ${scrolled ? 'sticky translate-y-5.5' : '-translate-y-0'} text-white text-5xl font-extrabold cursor-pointer`}>GIPHY</div>
            {
                width >= 1140 && (
                    <ul className={`flex gap-4 `}>
                        <li className="group flex flex-col items-center cursor-pointer">
                            <div className="px-3 py-1 bg-transparent transition duration-400  group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 ">
                                <span className="text-white text-lg font-semibold">Reactions</span>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                        </li>

                        <li className="group flex flex-col items-center cursor-pointer">
                            <div className="px-3 py-1 bg-transparent transition duration-400 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 ">
                                <span className="text-white text-lg font-semibold">Entertainment</span>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-purple-500  "></div>
                        </li>

                        <li className="group flex flex-col items-center cursor-pointer">
                            <div className="px-3 py-1 bg-transparent transition duration-400 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-fuchsia-500 ">
                                <span className="text-white text-lg font-semibold">Sports</span>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-fuchsia-500  "></div>
                        </li>

                        <li className="group flex flex-col items-center cursor-pointer">
                            <div className="px-3 py-1 bg-transparent transition duration-400 group-hover:bg-gradient-to-r group-hover:from-fuchsia-500 group-hover:to-pink-500 ">
                                <span className="text-white text-lg font-semibold">Stickers</span>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500 to-pink-500  "></div>
                        </li>

                        <li className="group flex flex-col items-center cursor-pointer">
                            <div className="px-3 py-1 bg-transparent transition duration-400 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 ">
                                <span className="text-white text-lg font-semibold">Artists</span>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-rose-500  "></div>
                        </li>
                    </ul>
                )
            }
            {
                width >= 1140 ? (
                    <div className={`flex gap-2 font-bold ${scrolled ? '-translate-y-14' : 'translate-y-0'}`}>
                        <div className='text-white bg-indigo-500 px-5 py-2 rounded'>Upload</div>
                        <div className='text-white bg-violet-500 px-5 py-2 rounded'>Create</div>
                    </div>
                ) : (
                    <></>
                )
            }
            {width >= 1140 && (
                <div onClick={handleiconRotate} className={`flex relative text-white items-center rounded-sm ${width > 1140 ? 'w-42' : ''} bg-gray-700 mr-3 gap-2 ${scrolled ? '-translate-y-14' : 'translate-y-0'}`}>
                    <div className='bg-violet-500 py-2 px-2 rounded-sm'>👀</div>
                    <div className='flex items-center gap-1 font-bold '>GIPHY User <ChevronDownIcon className={`h-6 w-5 animate duration-200 ${chevronUp ? 'rotate-0' : 'rotate-180'}`} /></div>

                    <div className={`flex flex-col absolute font-bold mt-43 space-y-1.5 bg-gray-800 w-full text-white py-5 px-2 rounded-md z-20 transition-all transform duration-200 ease-in-out 
                        ${chevronUp ? '-translate-y-2 opacity-0 -z-10 pointer-events-none' : 'translate-y-1'}`}>
                        <a className='cursor-pointer transition duration-100 ease-in hover:text-gray-300'>Profile</a>
                        <a className='cursor-pointer transition duration-100 ease-in hover:text-gray-300'>Join</a>
                        <a className='cursor-pointer transition duration-100 ease-in hover:text-gray-300'>Favoutites</a>
                    </div>

                </div>
            )}

            {width < 1140 && (
                <div className='flex gap-3'>

                    <div onClick={handleinnerUpload} className='flex relative h-full items-center'>
                        <PlusIcon className='h-10 text-green-500' />

                            <div
                                className={`flex flex-col transform transition-all duration-200 absolute mt-[148px] p-4 gap-5 rounded-md text-white bg-gray-800 z-20 shadow-lg
                                ${upload ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'}`}
                            >
                                <a className='cursor-pointer transition duration-100 ease-in hover:text-gray-300'>Upload</a>
                                <a className='cursor-pointer transition duration-100 ease-in hover:text-gray-300'>Create</a>
                            </div>

                    </div>

                    <div className='bg-violet-500 py-2 px-2 rounded-sm'>👀</div>
                    <div className='flex text-blue-400 h-10'><Bars3BottomRightIcon /></div>
                </div>
            )}
        </div>
    )
}

export default Navbar