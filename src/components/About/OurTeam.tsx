'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const OurTeam = ({ blok }: any) => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const people = blok?.person || [];

  // Adjust visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640)
        setVisibleCount(1); // mobile
      else if (window.innerWidth < 1024)
        setVisibleCount(2); // tablet
      else setVisibleCount(4); // desktop
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + visibleCount) % people.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - visibleCount + people.length) % people.length);
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className='bg-[#f9fafb] py-16 px-4 md:px-8'
    >
      {/* Heading */}
      <div className='max-w-6xl mx-auto text-center mb-10'>
        <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
          {blok.heading}
        </h2>
      </div>

      <div className='relative max-w-6xl mx-auto'>
        {/* Cards Wrapper */}
        <div className='flex gap-6 overflow-hidden justify-center w-full'>
          {people
            .slice(index, index + visibleCount)
            .concat(
              people.slice(
                0,
                Math.max(0, index + visibleCount - people.length),
              ),
            )
            .map((person: any) => (
              <div
                key={person._uid}
                className='flex flex-col items-center bg-white border border-gray-200 p-4 w-[85%] sm:w-[45%] lg:w-[23%] shadow-sm transition-transform duration-300'
              >
                {person.image?.filename && (
                  <div className='relative w-[200px] h-[200px] mb-4 overflow-hidden'>
                    <Image
                      src={person.image.filename}
                      alt={person.name}
                      fill
                      className='object-cover rounded-md'
                    />
                  </div>
                )}
                <h3 className='text-lg font-medium text-gray-800'>
                  {person.name}
                </h3>
                <p className='text-sm text-gray-500'>{person.designation}</p>
              </div>
            ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className='absolute top-1/2 -translate-y-1/2 left-0 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition z-10'
        >
          <FaArrowLeft size={22} className='text-gray-800' />
        </button>

        <button
          onClick={nextSlide}
          className='absolute top-1/2 -translate-y-1/2 right-0 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition z-10'
        >
          <FaArrowRight size={22} className='text-gray-800' />
        </button>
      </div>
    </section>
  );
};

export default OurTeam;
