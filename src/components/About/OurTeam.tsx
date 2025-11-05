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

      <div className="relative max-w-6xl mx-auto">
        {/* Team Cards */}
        <div className="flex gap-6 overflow-hidden justify-center w-full">
          {people.slice(index, index + 4).map((person: any, idx: number) => (
            <div
              key={person._uid}
              className="relative flex flex-col items-center bg-white border border-gray-200 p-4 w-[220px] md:w-[250px] shadow-sm"
            >
              {person.image?.filename && (
                <div className="relative w-[200px] h-[200px] mb-4 overflow-hidden">
                  <Image
                    src={person.image.filename}
                    alt={person.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-800">{person.name}</h3>
              <p className="text-sm text-gray-500">{person.designation}</p>
            </div>
          ))}
        </div>

        {/* Left Arrow - aligned to leftmost image */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-[2%] md:left-[3%] bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition z-10"
        >
          <FaArrowLeft size={22} className="text-gray-800" />
        </button>

        {/* Right Arrow - aligned to rightmost image */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-[2%] md:right-[3%] bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition z-10"
        >
          <FaArrowRight size={22} className="text-gray-800" />
        </button>
      </div>
    </section>
  );
};

export default OurTeam;
