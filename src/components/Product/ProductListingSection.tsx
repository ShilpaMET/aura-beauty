// src/app/components/ProductListingSection.tsx
'use client';

import { storyblokEditable } from '@storyblok/react';
import Link from 'next/link';

export default function ProductListingSection({ blok }: any) {
  const products = blok.products || []; 

  return (
    <section {...storyblokEditable(blok)} className='p-10'>
      <h2 className='text-2xl font-bold mb-6'>{blok.heading || 'Serums'}</h2>

      {products.length === 0 ? (
        <p className='text-gray-500'>No products found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {products.map((product: any) => (
            <Link
              href={`/serums/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={product._uid}
              className='border rounded-lg p-4 hover:shadow-lg transition-all'
            >
              {product.image?.filename && (
                <img
                  src={product.image.filename}
                  alt={product.name}
                  className='w-full h-80 max-w-md shadow-lg object-cover rounded-lg mb-4'
                />
              )}
              <h3 className='font-semibold'>{product.name}</h3>
              <p className='text-gray-500 line-through'>${product.price}</p>
              <p className='text-green-600 font-bold'>
                ${product.discount_price}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
