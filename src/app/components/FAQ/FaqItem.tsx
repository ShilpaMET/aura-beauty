// src/app/components/FaqItem.tsx
'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import { useState } from 'react';

const FaqItem = ({ blok }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div {...storyblokEditable(blok)} className="py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left font-medium text-gray-800"
      >
        <span>{blok.name}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <p className="mt-2 text-gray-600">{blok.description}</p>
      )}
    </div>
  );
};

export default FaqItem;
