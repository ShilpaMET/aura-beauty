// src/app/components/FaqContact.tsx
'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

const FaqContact = ({ blok }: any) => {
  return (
    <div
      {...storyblokEditable(blok)}
      className='bg-gray-50 p-6 rounded-xl shadow-sm'
    >
      <h3 className='text-lg font-semibold mb-2'>{blok.name}</h3>
      <p className='text-gray-600 mb-4'>{blok.description}</p>
      <Link
        href={blok.button_link?.cached_url === 'home' ? '/' : '#'}
        className='inline-flex items-center gap-2 bg-[#0a1f44] text-white px-6 py-3 rounded-full font-medium hover:bg-[#132f65] transition mt-4 md:mt-0 md:self-auto justify-center'
      >
        {blok.button_label || 'Contact Us'}
        <GoArrowUpRight />
      </Link>
    </div>
  );
};

export default FaqContact;
