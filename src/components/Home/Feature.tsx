// src/app/components/Feature.tsx
'use client';

import { useEffect, useState } from 'react';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';
import { getStoryblokApi } from '@/lib/storyblok';
import { FaHeart } from 'react-icons/fa';

export default function Feature({ blok }: any) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!blok.product_ref || blok.product_ref.length === 0) return;
      const storyblokApi = getStoryblokApi();

      const { data } = await storyblokApi.get('cdn/stories', {
        by_uuids: blok.product_ref.join(','),
        version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      });

      setProducts(data.stories);
    };

    fetchProducts();
  }, [blok.product_ref]);
  return (
    <section {...storyblokEditable(blok)} className='px-6 py-16 bg-[#f8f8f8]'>
      {/* Heading and Button Row */}
      <div className='max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4'>
        {/* Text Section */}
        <div className='text-center md:text-left md:flex-1'>
          <h2 className='text-2xl md:text-3xl font-bold text-[#1a1f3c] mb-2 md:mb-0'>
            {blok.heading}
          </h2>
          <p className='text-gray-500'>{blok.description}</p>
        </div>

        {/* Button Section */}
        {blok.button_label && (
          <a
            href={blok.button_link?.cached_url || '#'}
            className='inline-flex items-center gap-2 bg-[#0a1f44] text-white px-6 py-3 rounded-full font-medium hover:bg-[#132f65] transition mt-4 md:mt-0 md:self-auto justify-center'
          >
            {blok.button_label}
            <FiArrowRight className='w-4 h-4' />
          </a>
        )}
      </div>

      {/* Product grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
        {products?.map((product: any) => (
          <div
            key={product.content._uid}
            className='relative rounded-2xl transition-all duration-300 flex flex-col'
          >
            {/* Heart icon */}
            <button
              className='absolute top-3 right-3 bg-white/70 rounded-full p-1.5 z-10 cursor-default'
              disabled
            >
              {product.content.wishlist ? (
                <FaHeart className='text-red-500 w-4 h-4' />
              ) : (
                <FiHeart className='text-gray-600 w-4 h-4' />
              )}
            </button>

            {/* Image container */}
            <div className='bg-[#e9e9ec] rounded-2xl shadow-md hover:shadow-md transition flex items-center justify-center overflow-hidden h-[320px]'>
              {product.content.image?.filename && (
                <Image
                  src={product.content.image.filename}
                  alt={product.content.name}
                  width={300}
                  height={300}
                  className='object-cover w-full h-full'
                />
              )}
            </div>

            {/* Product details */}
            <div className='text-center mt-3 flex-grow'>
              <h3 className='font-medium text-gray-800'>
                {product.content.name}
              </h3>
              <div className='flex justify-center gap-2 mt-1'>
                <span className='text-gray-400 line-through text-sm'>
                  {Number(product.content.price).toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                  })}
                </span>

                <span className='text-gray-900 font-semibold'>
                  {Number(product.content.discount_price).toLocaleString(
                    'en-IN',
                    {
                      style: 'currency',
                      currency: 'INR',
                      minimumFractionDigits: 0,
                    },
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
