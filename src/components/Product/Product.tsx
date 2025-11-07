'use client';
import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLeftLong } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';

export default function Product({ blok }: any) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    Array.isArray(blok.size) ? blok.size[0] : blok.size
  );
  const router = useRouter();

  const toggleDesc = () => setShowFullDesc(!showFullDesc);

  const sizes = Array.isArray(blok.size) ? blok.size : [blok.size];

  return (
    <div {...storyblokEditable(blok)} className="max-w-6xl mx-auto px-4 py-12">
      {/* Back button */}
      <button
        onClick={() => router.push('/products')}
        className="mb-8 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
      >
        <FaLeftLong /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
            <img
              src={blok.image?.filename}
              alt={blok.image?.alt || blok.name}
              className="w-full rounded-2xl shadow-md object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-center h-full space-y-4">
          {/* Category */}
          {blok.category && (
            <p className="text-sm text-blue-900 font-semibold uppercase">
              #{blok.category}
            </p>
          )}

          {/* Product Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {blok.name}
          </h1>

          {/* Price & Discount */}
          <div className="flex items-center gap-4">
            {blok.discount_price ? (
              <>
                <span className="line-through text-gray-400 text-lg">
                  ₹{blok.price}
                </span>
                <span className="text-green-600 font-bold text-2xl sm:text-3xl">
                  ₹{blok.discount_price}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-2xl sm:text-3xl">
                ₹{blok.price}
              </span>
            )}
          </div>

          {/* Availability */}
          <p
            className={`font-medium ${blok.availability ? 'text-green-600' : 'text-red-600'
              }`}
          >
            {blok.availability ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Description */}
          <p
            className={`text-gray-700 leading-relaxed ${!showFullDesc ? 'line-clamp-5' : ''
              } mt-2`}
          >
            {blok.description}
          </p>
          {blok.description.length > 200 && (
            <button
              onClick={toggleDesc}
              className='text-blue-600 font-semibold text-sm hover:underline mt-1 block text-left'
            >
              {showFullDesc ? 'Read Less' : 'Read More'}
            </button>
          )}


          {/* Size Selector */}
          {sizes.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {sizes.map((sizeOption: string) => (
                <button
                  key={sizeOption}
                  onClick={() => setSelectedSize(sizeOption)}
                  className={`px-5 py-2 rounded-full border text-sm font-semibold transition ${selectedSize === sizeOption
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-blue-900 border-blue-900'
                    }`}
                >
                  {sizeOption.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <button className='inline-flex items-center gap-2 bg-[#0a1f44] text-white px-6 py-3 rounded-full font-medium hover:bg-[#132f65] transition mt-4 md:mt-0 md:self-auto justify-center'>
              Add to Cart <GoArrowUpRight />
            </button>
            <button className='inline-flex items-center gap-2 bg-[#0a1f44] text-white px-6 py-3 rounded-full font-medium hover:bg-[#132f65] transition mt-4 md:mt-0 md:self-auto justify-center'>
              Buy It Now <GoArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
