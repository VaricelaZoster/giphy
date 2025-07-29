import React, { useState } from 'react';

const Gif = ({ info }) => {
    if (!info?.images?.fixed_height?.url) return null;



    return (
        <div className="w-full break-inside-avoid relative rounded-xl overflow-hidden ">
            <img
                src={info.images.fixed_height.url}
                alt={info.title || 'GIF'}
                className="w-full object-cover "
                loading="lazy"
            ></img>
            <div className="flex w-full absolute bottom-0 h-full opacity-0 hover:opacity-100 bg-gradient-to-b from-transparent from-60% to-black items-end p-2 text-white transition-opacity duration-300">
                {info.user && (
                    <img
                    src={info.user?.avatar_url}
                    className="absolute bottom-3 h-10 w-10 rounded-full"
                    alt="avatar"
                  />
                )}
                <a className={`${info.user ? 'pl-12 font-extrabold' : 'pl-0 font-bold'} truncate pb-2.5 whitespace-nowrap block`}>{info.user?.display_name || info.title || 'Untitled GIF'}</a>
            </div>

        </div>
    );
};

export default Gif;
