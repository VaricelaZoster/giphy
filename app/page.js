'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Gif from '../components/Gif';
import useDeviceSize from '@/app/hooks/Width';
import { useSession, signIn, signOut } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const LIMIT = 25;

  // Initial load
  useEffect(() => {
    const init = async () => {
      setResults([]);
      setOffset(0);
      setHasMore(true);
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}&offset=0&rating=g&bundle=messaging_non_clips`
        );
        const json = await res.json();
        setResults(json.data);
        setOffset(LIMIT);
        if (json.data.length < LIMIT) setHasMore(false);
      } catch (err) {
        setError('Failed to load trending GIFs.');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // Infinite scroll with debounce
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 300 &&
          !isLoading &&
          hasMore
        ) {
          if(results.length <= 150) {
            fetchTrending();
          }
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, offset, hasMore]);

  const fetchTrending = async () => {
    if(results.length <= 150){
      setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}&offset=${offset}&rating=g&bundle=messaging_non_clips`
      );
      const json = await res.json();
      setResults((prev) => [...prev, ...json.data]);
      setOffset((prev) => prev + LIMIT);
      if (json.data.length < LIMIT) setHasMore(false);
    } catch (err) {
      setError('Error fetching more GIFs.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
    }
  };

  return (
    <div className="w-screen min-w-[297px] min-h-screen bg-black flex justify-center text-white">
      <div className="flex flex-col w-full lg:w-[66.5%] items-center gap-3 px-2">
        <Navbar session = {session} />
        <Input />

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center py-2">{error}</p>
        )}

        {/* GIF Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 overflow-visible space-y-2 w-full">
          {results.map((gif,index) => (
            <Gif key={index} info={gif} />
          ))}
        </div>

        {/* Loading + No more */}
        {isLoading && (
          <p className="text-center text-gray-400 py-4">Loading more...</p>
        )}
        {!hasMore && (
          <p className="text-center text-gray-500 py-4">No more GIFs to load.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
