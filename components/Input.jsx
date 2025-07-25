'use client';
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Input = () => {
  const placeholders = ['Search all the GIFs and Stickers', '@username to search channels'];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInput = () => {
    console.log(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(inputValue);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /*useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);*/

  return (
    <div
      className={`sticky top-0 z-10 bg-black w-full py-2 pr-0 transition-all duration-300 `}
    >
      <div className="flex w-full">
        {/*scrolled && (
          <div className={`absolute transform duration-200 ${scrolled ? 'translate-y-0' : 'translate-y-2'} flex items-center h-20`}>
            <div className='text-5xl font-extrabold'>GIPHY</div>
          </div>
        )*/}
        <input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[placeholderIndex]}
          className={`relative h-20 w-[92%] transition-all duration-200 ${scrolled ? 'ml-43' : 'ml-0'} bg-white text-black rounded-l-md px-4 text-2xl focus:outline-0`}
        />
        <div
          onClick={handleInput}
          className="flex justify-center items-center text-white w-[8%] bg-gradient-to-tr from-pink-600 via-pink-400 to-yellow-500 rounded-r-md cursor-pointer"
        >
          <MagnifyingGlassIcon className="w-14 rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default Input;
