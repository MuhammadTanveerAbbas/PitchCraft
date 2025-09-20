'use client';

import React from 'react';
import Image from 'next/image';

interface ThumbnailProps {
  title: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ title }) => {
  return (
    <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <h2 
          className="text-center font-headline font-bold text-3xl md:text-5xl text-foreground drop-shadow-md"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          {title.toUpperCase()}
        </h2>
      </div>
    </div>
  );
};

export default Thumbnail;
