'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Marquee = ({ blok }: any) => {
  const items: string[] = blok?.items || [];
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < items.length - 1) setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className='relative bg-[#112D4E] text-white py-4 overflow-hidden'
    >
      <div className='block xl:hidden relative'>
        <button
          onClick={prev}
          disabled={index === 0}
          className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full z-10 transition disabled:opacity-30'
        >
          <FaChevronLeft size={14} />
        </button>

        <button
          onClick={next}
          disabled={index >= items.length - 1}
          className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full z-10 transition disabled:opacity-30'
        >
          <FaChevronRight size={14} />
        </button>

        <div className='overflow-hidden w-full'>
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 flex justify-center items-center text-center">
                <span className='text-sm sm:text-base md:text-lg font-medium px-6'>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='hidden xl:flex justify-center items-center gap-10 px-4 whitespace-nowrap'>
        {items.map((item, i) => (
          <span
            key={i}
            className='text-base md:text-lg font-medium text-center'
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
