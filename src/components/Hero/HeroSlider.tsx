'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const HeroSlider = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className='absolute inset-0 w-full h-full overflow-hidden'>
      {images.map((img: any, i: any) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img.filename}
            alt={img.alt || 'Slide'}
            fill
            className='object-cover'
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;
