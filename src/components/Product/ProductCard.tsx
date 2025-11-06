// src/components/Product/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

const ProductCard = ({ product }: any) => {
  const { name, price, size, image, slug, discount_price, wishlist } = product;
  const productSlug = product.full_slug || `products/${slug}`;

  return (
    <Link href={`/${productSlug}`} passHref>
      <div className='relative bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center hover:shadow-md transition'>
        <button
          className='absolute top-3 right-3 bg-white/70 rounded-full p-1.5 z-10 cursor-default'
          disabled
        >
          {wishlist ? (
            <FaHeart className='text-red-500 w-4 h-4' />
          ) : (
            <FiHeart className='text-gray-600 w-4 h-4' />
          )}
        </button>

        {/* Product Image */}
        <div className='relative w-full h-64 mb-4'>
          {image?.filename ? (
            <Image
              src={image.filename}
              alt={image.alt || name}
              fill
              className='object-cover rounded-md'
            />
          ) : (
            <div className='bg-gray-100 w-full h-full rounded-md flex items-center justify-center text-gray-400'>
              No Image
            </div>
          )}
        </div>

        {/* Product Details */}
        <h3 className='text-[#1e2b47] font-semibold mb-2 text-center'>
          {name}
        </h3>

        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-2'>
            {price && discount_price && price !== discount_price ? (
              <>
                <span className='text-gray-400 line-through text-sm'>
                  {Number(price).toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                  })}
                </span>
                <span className='text-gray-900 font-semibold'>
                  {Number(discount_price).toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                  })}
                </span>
              </>
            ) : (
              <span className='text-gray-900 font-semibold'>
                {Number(discount_price || price).toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                })}
              </span>
            )}
          </div>

          {size && <p className='text-gray-500 text-sm mb-1'>{Array.isArray(size) ? size.join(' ') : size}</p>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
