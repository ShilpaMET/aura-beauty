// src/app/components/Feature.tsx
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';

export default function Feature({ blok }: any) {
  //   console.log("🚀 ~ Feature ~ blok:", blok);

  return (
    <section
      {...storyblokEditable(blok)}
      className='p-6 bg-gray-100 rounded-xl shadow text-center'
    >
      <h2 className='text-2xl font-bold mb-4'>{blok.heading}</h2>
      <p className='text-gray-600 mb-6'>{blok.description}</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {blok.product_items?.map((product: any) => (
          <div key={product._uid} className='bg-white p-4 rounded shadow'>
            {product.image?.filename && (
              <Image
                src={product.image.filename}
                alt={product.name}
                width={300}
                height={300}
                className='object-cover mb-2'
              />
            )}
            <h3 className='font-semibold'>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>

      {blok.button_label && (
        <a
          href={blok.button_link?.cached_url || '#'}
          className='inline-block mt-6 px-6 py-3 bg-black text-white rounded-full'
        >
          {blok.button_label}
        </a>
      )}
    </section>
  );
}
