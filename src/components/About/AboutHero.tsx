// src/app/components/About/AboutHero.tsx
'use client';

import { storyblokEditable } from '@storyblok/react/rsc';

const AboutHero = ({ blok }: any) => {

  return (
    <section
      className="relative w-full h-[70vh] flex items-center justify-center text-center text-white pt-[85px]"
      style={{
        backgroundImage: `url(${blok.background_image?.filename})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...storyblokEditable(blok)}
    >
      {/* Optional overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-3xl px-4">
         {blok.heading && (
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {blok.heading}
          </h1>
        )}
        {blok.subHeading && (
          <p className="text-lg md:text-xl font-light mb-2 tracking-wide">
            {blok.subHeading}
          </p>
        )}
       
      </div>
    </section>
  );
};

export default AboutHero;