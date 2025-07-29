'use client';
import Navbar from '@/components/Navbar';
import Input from '@/components/Input';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Gif from '@/components/Gif';

const Page = () => {
  const searchParams = useSearchParams();
  const [gif, setGif] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;

    const fetchGIF = async () => {
      try {
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`
        );
        const json = await res.json();
        setGif(json.data);
      } catch (err) {
        console.error('Error fetching GIF:', err);
      }
    };

    fetchGIF();
  }, [searchParams, API_KEY]);

  if (!gif) return <div>Loading...</div>;

  return (
    <div className="w-screen min-w-[297px] min-h-screen bg-black flex justify-center text-white">
      <div className="flex flex-col w-full lg:w-[66.5%] items-center gap-3 px-2">
        <Navbar/>
        <Input/>
        <Gif info={gif}/>
      </div>
    </div>
  );
};

export default Page;
