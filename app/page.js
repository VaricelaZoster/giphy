'use client';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Gif from '../components/Gif';
import useDeviceSize from '@/app/hooks/Width';

const Page = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

 

  return (
    <div className="w-screen min-w-[297px] min-h-screen bg-black flex justify-center text-white">
      <div className="flex flex-col w-full lg:w-[66.5%] items-center gap-3 px-2">
        <Navbar />
        <Input />
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 overflow-visible space-y-2 w-full">
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
