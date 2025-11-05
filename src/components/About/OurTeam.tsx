'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const OurTeam = ({ blok }: any) => {
  const [index, setIndex] = useState(0);
  const people = blok?.person || [];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % people.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + people.length) % people.length);
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#f9fafb] py-16 px-4 md:px-8"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">{blok.heading}</h2>
      </div>

      <div className="relative max-w-6xl mx-auto flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-[-60px] md:left-[-80px] text-gray-800 hover:text-black transition"
        >
          <FaArrowLeft size={28} strokeWidth={2} />
        </button>

        {/* Team Cards */}
        <div className="flex gap-6 overflow-hidden justify-center w-full">
          {people.slice(index, index + 4).map((person: any) => (
            <div
              key={person._uid}
              className="flex flex-col items-center bg-white border border-gray-200 p-4 w-[220px] md:w-[250px] shadow-sm"
            >
              {person.image?.filename && (
                <div className="relative w-[200px] h-[200px] mb-4 overflow-hidden">
                  <Image
                    src={person.image.filename}
                    alt={person.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-800">{person.name}</h3>
              <p className="text-sm text-gray-500">{person.designation}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-[-60px] md:right-[-80px] text-gray-800 hover:text-black transition"
        >
          <FaArrowRight size={28} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
};

export default OurTeam;
