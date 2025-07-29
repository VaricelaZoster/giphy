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
    <div className="flex-col w-screen min-w-[297px] min-h-screen bg-black flex items-center text-white">
      <div className="flex flex-col w-screen lg:w-[66.5%] items-center justify-center gap-3 px-2">
        <Navbar />
        <Input/>
        {console.log(gif)}
        <div className='flex w-full h-32 items-start'>
          <div className='flex-1 h-40 w-full'>
            {gif.user && (
              <div className='flex gap-4 bg-gradient-to-b from-neutral-800 from-10% to-neutral-950 h-full mt-3.5 rounded-xl p-3'>
                <img className='h-14' src = {gif.user.avatar_url}/>
                <div className='flex flex-col w-full'>
                  <div className='text-xl w-34 font-bold truncate whitespace-nowrap overflow-hidden'>{gif.user.display_name}</div>
                  <div className='text-sm font-bold text-neutral-400 cursor-pointer hover:text-white'>@{gif.user.username}</div>
                </div>
              </div>
            )}
          </div>
          <div className='flex-[2] h-full scale-80 flex items-start justify-center'>
            <Gif info={gif} />
          </div>
          <div className='flex-1'>tools</div>
        </div>

      </div>
    </div>
  );
};

export default Page;
