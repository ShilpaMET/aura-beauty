// aura-beauty/src/app/components/Product.tsx
import { storyblokEditable } from '@storyblok/react';

export default function Product({ blok }: any) {
  return (
    <div {...storyblokEditable(blok)} className='max-w-md mx-auto'>
      <img
        src={blok.image?.filename}
        alt={blok.name}
        className='w-full h-64 object-cover rounded-lg mb-4'
      />
      <h1 className='text-2xl font-bold mb-2'>{blok.name}</h1>
      <p className='text-gray-700 mb-4'>{blok.description}</p>
      {blok.discount_price ? (
        <div className='flex items-center gap-2'>
          <p className='line-through text-gray-400'>${blok.price}</p>
          <p className='text-green-600 font-bold'>${blok.discount_price}</p>
        </div>
      ) : (
        <p className='text-gray-800 font-bold'>${blok.price}</p>
      )}
    </div>
  );
}
