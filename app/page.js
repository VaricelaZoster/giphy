'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { HeartIcon, LinkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Gif from '../components/Gif';

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

  console.log(favorites)

 

  return (
    <div className="w-screen min-h-screen bg-black flex justify-center text-white">
      <div className="flex flex-col w-full lg:w-[66.5%] items-center gap-3 px-4">
        <Navbar />
        <Input />
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2 w-full">
          {results.map((gif,index) => (
            <Gif className = '' key = {index} info={gif}/>
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
