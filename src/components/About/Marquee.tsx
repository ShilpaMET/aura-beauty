// src/app/components/About/Marquee.tsx
'use client';

import { storyblokEditable } from '@storyblok/react/rsc';

const Marquee = ({ blok }: any) => {
  const { items } = blok;

  return (
    <section
      className="bg-[#112D4E] text-white py-3 overflow-hidden"
      {...storyblokEditable(blok)}
    >
      <div className="flex justify-center items-center gap-12 whitespace-nowrap animate-none">
        {items?.map((item: string, index: number) => (
          <span key={index} className="text-sm md:text-base font-medium">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;