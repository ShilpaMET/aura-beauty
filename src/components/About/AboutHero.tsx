// src/app/components/About/AboutHero.tsx
'use client';

import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react';
import { FaArrowDown } from 'react-icons/fa';
import { useCallback } from 'react';

const AboutHero = ({ blok }: any) => {
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      className='relative w-full h-[80vh] flex items-center justify-center text-center text-white overflow-hidden'
      {...storyblokEditable(blok)}
    >
      {blok.background_image?.filename && (
        <Image
          src={blok.background_image.filename}
          alt={blok.background_image.alt || 'About Hero Background'}
          fill
          priority
          className='object-cover'
        />
      )}

      <div className='absolute inset-0 bg-black/40'></div>

      <div className='relative z-10 max-w-3xl px-4'>
        {blok.heading && (
          <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
            {blok.heading}
          </h1>
        )}
        {blok.subHeading && (
          <p className='text-lg md:text-xl font-light mt-2 tracking-wide'>
            {blok.subHeading}
          </p>
        )}
      </div>

      <button
        onClick={handleScroll}
        className='absolute right-10 bottom-10 flex items-center gap-2 text-black bg-white/80 px-4 py-2 rounded-full shadow-md hover:bg-white transition-all duration-300 z-20'
      >
        <span className='font-medium'>Scroll</span>
        <FaArrowDown />
      </button>
    </section>
  );
};

export default AboutHero;
