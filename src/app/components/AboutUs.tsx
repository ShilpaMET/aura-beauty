// src/app/components/AboutUs.tsx
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface AboutUsProps {
  blok: SbBlokData & {
    title?: string;
    description?: string;
    image?: {
      filename: string;
      alt?: string;
    };
  };
}

// ✅ Server Component — No "use client"
export default function AboutUs({ blok }: AboutUsProps) {
  return (
    <section
      {...storyblokEditable(blok)}
      className='max-w-5xl mx-auto py-16 px-6 text-center'
    >
      {blok.image?.filename && (
        <img
          src={blok.image.filename}
          alt={blok.image.alt || blok.title || 'About us image'}
          className='w-full max-w-md mx-auto rounded-2xl mb-8 shadow-lg'
        />
      )}
      {blok.title && (
        <h2 className='text-4xl font-bold text-gray-800 mb-4'>{blok.title}</h2>
      )}
      {blok.description && (
        <p className='text-lg text-gray-600 leading-relaxed'>
          {blok.description}
        </p>
      )}
    </section>
  );
}
