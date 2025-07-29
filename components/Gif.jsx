import React from 'react';

const Gif = ({ info }) => {
  if (!info?.images?.fixed_height?.url) return null;

  return (
    <div className="w-full break-inside-avoid rounded-xl overflow-hidden">
      <img
        src={info.images.fixed_height.url}
        alt={info.title || 'GIF'}
        className="w-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default Gif;
