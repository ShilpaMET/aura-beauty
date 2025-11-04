// aura-beauty/src/app/components/Hero.tsx
'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';

const Hero = ({ blok }: any) => {
  return (
    <section
      {...storyblokEditable(blok)}
      className='relative w-full h-[80vh] flex items-center justify-start text-white'
    >
      {blok.background_image?.filename && (
        <Image
          src={blok.background_image.filename}
          alt={blok.headline || 'Hero background'}
          fill
          className='object-cover brightness-75'
          priority
        />
      )}

      <div className='relative z-10 max-w-2xl p-10'>
        {blok.subheadline && (
          <p className='text-sm font-medium mb-2'>{blok.subheadline}</p>
        )}
        {blok.headline && (
          <h1 className='text-4xl font-bold mb-4 leading-tight'>
            {blok.headline}
          </h1>
        )}
        {blok.description && (
          <p className='text-lg opacity-90 mb-6'>{blok.description}</p>
        )}
        {blok.button_label && (
          <button className='px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition'>
            {blok.button_label}
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
