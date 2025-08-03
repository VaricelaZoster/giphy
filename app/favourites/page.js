'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Input from '@/components/Input';
import { useSession } from 'next-auth/react';
import Gif from '@/components/Gif';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const FavouritesPage = () => {
  const { data: session } = useSession();
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchFavourites = async () => {
      try {
        const dbName = session.user?.name || 'GIPHY';
        const dbRes = await fetch('/api/findAll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db: dbName }),
        });

        const { result } = await dbRes.json();

        if (!result || result.length === 0) {
          setGifs([]);
          setLoading(false);
          return;
        }

        const ids = result.map((gif) => gif.id).join(',');

        const giphyRes = await fetch(
          `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}&rating=g`
        );

        const giphyData = await giphyRes.json();

        setGifs(giphyData.data || []);
      } catch (err) {
        console.error('🚨 Error loading favourites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [session]);

  return (
    <div className="flex-col w-screen min-w-[297px] min-h-screen bg-black flex items-center text-white">
      <div className="flex flex-col w-screen lg:w-[66.5%] items-center justify-center gap-3 px-2">
        <Navbar session={session} />
        <Input />

        <div className="flex font-bold text-neutral-300 opacity-70 w-full mb-4">
          {session ? 'My Favourites' : 'Please Log In'}
        </div>

        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : gifs.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 overflow-visible space-y-2 w-full">
            {gifs.map((gif) => (
              <Gif key={gif.id} info={gif} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">No favourites found.</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
