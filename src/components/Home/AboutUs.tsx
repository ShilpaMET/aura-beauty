import { storyblokEditable, SbBlokData } from '@storyblok/react';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

interface AboutUsProps {
  blok: SbBlokData & {
    heading?: string;
    preHeading?: string;
    description?: string;
    image?: {
      filename: string;
      alt?: any;
    };
    button_label?: string;
    button_link?: any;
    image_left?: boolean;
  };
}

export default function AboutUs({ blok }: AboutUsProps) {
  const isImageLeft = blok.image_left === true;

  return (
    <section
      {...storyblokEditable(blok)}
      className='max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-12'
    >
      {/* 🖼️ Image Section */}
      {blok.image?.filename && (
        <div
          className={`flex ${isImageLeft
              ? 'md:order-1 md:justify-start' // Image on left
              : 'md:order-2 md:justify-end' // Image on right
            }`}
        >
          <img
            src={blok.image.filename}
            alt={blok.image.alt || blok.title || 'About us image'}
            className='w-full max-w-sm rounded-2xl object-cover shadow-md'
          />
        </div>
      )}

      {/* 📝 Text Section */}
      <div
        className={`text-left space-y-5 ${isImageLeft ? 'md:order-2' : 'md:order-1'
          }`}
      >
        {blok.preHeading && (
          <p className='text-sm uppercase tracking-wide text-gray-500'>
            {blok.preHeading}
          </p>
        )}
        {blok.heading && (
          <h2 className='text-3xl md:text-4xl font-semibold text-gray-900'>
            {blok.heading}
          </h2>
        )}
        {blok.description && (
          <p className='text-gray-600 leading-relaxed text-base md:text-lg'>
            {blok.description}
          </p>
        )}

        {blok.button_label && (

           <Link
          href={`/${blok.button_link?.cached_url || '/'}`}
            className='inline-flex items-center gap-2 bg-[#0a1f44] text-white px-6 py-3 rounded-full font-medium hover:bg-[#132f65] transition mt-4 md:mt-0 md:self-auto justify-center'
        >
          {blok.button_label}
          <span aria-hidden='true'>
            <GoArrowUpRight />
          </span>
        </Link>
        )}
      </div>
    </section>
  );
}
