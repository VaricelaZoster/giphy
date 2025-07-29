import React, { useState } from 'react';
import { HeartIcon, LinkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Gif = ({ info }) => {
    if (!info?.images?.fixed_height?.url) return null;


    const router = useRouter();

    const handleGIFRoute = () => {
        const url = `/gif?id=${info.id}`;
        console.log(url)
        router.push(url);
    }

    return (
        <div onClick={handleGIFRoute} className="w-full group break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer">
            <img
                src={info.images.fixed_height.url}
                alt={info.title || 'GIF'}
                className="w-full object-cover "
                loading="lazy"
            ></img>
            <div className="flex w-full absolute bottom-0 h-full opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent from-60% to-black items-end p-2 text-white transition-opacity duration-300">
                {info.user && (
                    <img
                    src={info.user?.avatar_url}
                    className="absolute bottom-3 h-10 w-10 rounded-full"
                    alt="avatar"
                  />
                )}
                <a className={`${info.user ? 'pl-12 font-extrabold' : 'pl-0 font-bold'} hover:underline cursor-pointer truncate mb-2.5 whitespace-nowrap block`}>{info.user?.display_name || info.title || 'Untitled GIF'}</a>
            </div>
            <div className='flex opacity-0 group-hover:opacity-100 p-1 gap-2 absolute top-1.5 right-3 bg-black/60 rounded transition-opacity duration-300'>
                <div className='transition transform-all hover:scale-120'><HeartIcon className='w-5'/></div>
                <div className='transition transform-all hover:scale-120'><LinkIcon className='w-5'/></div>
            </div>
        </div>
    );
};

export default Gif;
