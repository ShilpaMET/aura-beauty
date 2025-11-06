// src/components/Product/Product.tsx
'use client';
import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';

export default function Product({ blok }: any) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const toggleDesc = () => setShowFullDesc(!showFullDesc);

  return (
    <div
      {...storyblokEditable(blok)}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start md:items-center">
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
            <img
              src={blok.image?.filename}
              alt={blok.name}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-center h-full">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {blok.name}
            </h1>

            <p className={`text-gray-700 leading-relaxed ${!showFullDesc ? 'line-clamp-6' : ''}`}>
              {blok.description}
            </p>

            {blok.description.length > 200 && (
              <button
                onClick={toggleDesc}
                className="text-blue-600 font-semibold text-sm hover:underline mt-1"
              >
                {showFullDesc ? 'Read Less' : 'Read More'}
              </button>
            )}

            <div className="flex items-center gap-4 mt-4">
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

            <p
              className={`font-medium mt-2 ${
                blok.availability ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {blok.availability ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
