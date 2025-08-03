'use client';
export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar';
import Input from '@/components/Input';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import Gif from '@/components/Gif';
import { HeartIcon, LinkIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';

const Page = () => {
  const searchParams = useSearchParams();
  const [gif, setGif] = useState(null);
  const [fav, setFav] = useState(false);
  const [channel, setChannel] = useState(null);
  const [readmore, setReadmore] = useState(false);

  const {data: session} = useSession();
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

  useEffect(() => {
    if (!gif?.username) return;

    const fetchChannel = async () => {
      try {
        const res = await fetch(
          `https://api.giphy.com/v1/channels/search?api_key=${API_KEY}&q=${gif.username}&limit=1&offset=0`
        );
        const json = await res.json();
        setChannel(json.data[0]?.user?.description || '');
      } catch (err) {
        console.error('Error fetching channel:', err);
      }
    };

    fetchChannel();
  }, [gif, API_KEY]);

  useEffect(() => {
    if (!gif) return;

    const checkFav = async () => {
      try {
        const gif1 = {...gif, db: session?.user?.name || 'GIPHY'};
        const res = await fetch('/api/find', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gif1),
        });

        const data = await res.json();
        if (data.result) {
          setFav(true);
        }
      } catch (err) {
        console.error('🚨 Error checking favorite:', err);
      }
    };

    checkFav();
  }, [gif]);

  const handleAddFav = useCallback(async () => {
    if (fav == false) {
      try {
        const gif1 = {...gif, db: session?.user?.name || 'GIPHY'};
        const res = await fetch('/api/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gif1),
        });

        const data = await res.json();
        console.log('Added to favorites:', data);
        if (data.success) {
          setFav(true);
          console.log('Added to favorites:', data.result);
        } else {
          console.error('Failed to add to favorites');
        }
      } catch (err) {
        console.error('🚨 Error adding favorite:', err);
      }
    }
    else {
      try {
        const gif1 = {...gif, db: session?.user?.name || 'GIPHY'};
        const res = await fetch('/api/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gif1),
        });

        const data = await res.json();
        console.log('Deleted document:', data);
        if (data.result.acknowledged) {
           setFav(false);
           console.log('Removed from favorites:', data.result);
        } else {
         console.error('Failed to remove from favorites');
        }
      } catch (err) {
        console.error('🚨 Error adding favorite:', err);
      }
    }
  });

  const handleLinkCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const handleReadMore = () => {
    setReadmore(!readmore);
  };

  if (!gif) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="flex-col w-screen min-w-[297px] min-h-screen bg-black flex items-center text-white">
      <div className="flex flex-col w-screen lg:w-[66.5%] items-center justify-center gap-3 px-2">
        <Navbar session={session}/>
        <Input />

        <div className="flex w-full min-h-32 items-start">
          <div className="flex-1 w-full">
            {gif.user && (
              <div className="flex flex-col gap-4 w-65 bg-gradient-to-b from-neutral-800 from-10% to-neutral-950 mt-3.5 rounded-xl p-3">
                <div className="flex gap-3">
                  <img className="h-14 rounded-full" src={gif.user.avatar_url} alt="User Avatar" />
                  <div className="flex flex-col w-full">
                    <div className="text-xl font-bold truncate whitespace-nowrap overflow-hidden max-w-[10rem]">
                      {gif.user.display_name}
                    </div>
                    <div className="text-sm font-bold text-neutral-400 cursor-pointer hover:text-white">
                      @{gif.user.username}
                    </div>
                  </div>
                </div>

                {channel && (
                  <>
                    <div className={`transition-all transform ${readmore ? '' : 'line-clamp-3'} text-sm text-neutral-300`}>
                      {channel}
                    </div>
                    <div
                      onClick={handleReadMore}
                      className="mt-1 cursor-pointer w-fit"
                    >
                      {readmore ? 'Read less' : 'Read more'}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex-[2] scale-90 flex items-start justify-center">
            <Gif info={gif} />
          </div>

          <div className="flex-1 space-y-8 mt-4">
            <div
              onClick={handleAddFav}
              className={`flex gap-3 group items-center text-xl ${fav ? 'text-red-500' : ''} text-neutral-400 font-bold cursor-pointer hover:text-red-500`}
            >
              <HeartIcon className="w-5.5 transition group-hover:scale-150" />
              Favourite
            </div>

            <div
              onClick={handleLinkCopy}
              className="flex gap-3 group items-center text-xl text-neutral-400 font-bold cursor-pointer hover:text-blue-500"
            >
              <LinkIcon className="w-5.5 transition group-hover:scale-150" />
              Copy Link
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
