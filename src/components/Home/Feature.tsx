// src/app/components/Feature.tsx
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';

export default function Feature({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className='px-6 py-16 bg-[#f8f8f8]'>
      {/* Heading and Button Row */}
      <div className='max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-[#1a1f3c] mb-2 md:mb-0'>
            {blok.heading}
          </h2>
          <p className='text-gray-500'>{blok.description}</p>
        </div>

        {blok.button_label && (
          <a
            href={blok.button_link?.cached_url || '#'}
            className='inline-flex items-center gap-2 bg-[#0a1f44] text-white px-6 py-3 rounded-full font-medium hover:bg-[#132f65] transition self-start md:self-center'
          >
            {blok.button_label}
            <FiArrowRight className='w-4 h-4' />
          </a>
        )}
      </div>

      {/* Product grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
        {blok.product_items?.map((product: any) => (
          <div
            key={product._uid}
            className='relative rounded-2xl transition-all duration-300 flex flex-col'
          >
            {/* Heart icon */}
            <button className='absolute top-3 right-3 bg-white/70 rounded-full p-1.5 hover:bg-white transition z-10'>
              <FiHeart className='text-gray-600 hover:text-red-500 w-4 h-4' />
            </button>

            {/* Image container */}
            <div className='bg-[#e9e9ec] rounded-2xl shadow-md hover:shadow-md transition flex items-center justify-center overflow-hidden h-[320px]'>
              {product.image?.filename && (
                <Image
                  src={product.image.filename}
                  alt={product.name}
                  width={300}
                  height={300}
                  className='object-cover w-full h-full'
                />
              )}
            </div>

            {/* Product details */}
            <div className='text-center mt-3 flex-grow'>
              <h3 className='font-medium text-gray-800'>{product.name}</h3>
              <div className='flex justify-center gap-2 mt-1'>
                <span className='text-gray-400 line-through text-sm'>
                  ${product.price}
                </span>
                <span className='text-gray-900 font-semibold'>
                  ${product.discount_price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
