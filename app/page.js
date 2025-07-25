'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { HeartIcon, LinkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Page = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const LIMIT = 25;

  const fetchTrending = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}&offset=${offset}&rating=g&bundle=messaging_non_clips`
      );
      const json = await res.json();
      setResults((prev) => [...prev, ...json.data]);
      setOffset((prev) => prev + LIMIT);
    } catch (err) {
      console.error('Error fetching trending GIFs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300 &&
        !isLoading
      ) {
        fetchTrending();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  console.log(favorites)

  const linkCopy = (url) => {
   
  };

  return (
    <div className="w-screen min-h-screen bg-black flex justify-center text-white">
      <div className="flex flex-col w-full lg:w-[66.5%] items-center gap-3 px-4">
        <Navbar />
        <Input />
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1 w-full space-y-1">
          {results.map((gif,index) => (
            <div
              key={index}
              className="break-inside-avoid p-1 relative group cursor-pointer"
            >
              <img
                src={gif.images.original.url}
                alt={gif.title}
                className="w-full rounded-lg"
                loading="lazy"
              />

              {/* Hover Buttons */}
              <div className="absolute opacity-0 group-hover:opacity-100 flex top-2 right-4">
                <div className="flex bg-[rgba(0,0,0,0.4)] space-x-2 rounded p-1">
                  <div
                    onClick={() => toggleFavorite(gif.id)}
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    <HeartIcon
                      className={`h-6 w-6 ${favorites.has(gif.id) ? 'text-red-500' : 'text-white'}`}
                    />
                  </div>
                  <div
                    onClick={() => linkCopy(gif.url)}
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    <LinkIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Title / Display Name */}
              <div
                className={`absolute bottom-0 bg-gradient-to-b from-transparent to-black w-full text-sm text-white
                ${gif.user?.display_name ? 'text-xl font-extrabold hover:underline truncate' : 'font-bold'}
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-2 rounded-b-lg`}
              >
                {gif.user && (
                  <img
                    src={gif.user?.avatar_url}
                    className="absolute bottom-3 h-10 w-10 rounded-full"
                    alt="avatar"
                  />
                )}

                <a className={`${gif.user ? 'pl-12' : 'pl-0'} truncate whitespace-nowrap block`}>
                  {gif.user?.display_name || gif.title || 'Untitled GIF'}
                </a>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <p className="text-center text-gray-400 py-4">Loading more...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
