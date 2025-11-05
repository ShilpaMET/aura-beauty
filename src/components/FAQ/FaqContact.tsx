// src/app/components/FaqContact.tsx
'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';

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
        className='inline-block bg-blue-900 text-white py-2 px-4 rounded-md'
      >
        {blok.button_label || 'Contact Us'}
      </Link>
    </div>
  );
};

export default FaqContact;
