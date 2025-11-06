import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: any) => {
  const { name, price, size, image ,slug} = product;  
  const productSlug = product.full_slug || `products/${slug}`;

  return (
    <Link href={`/${productSlug}`} passHref>
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center hover:shadow-md transition">
      <div className="relative w-full h-64 mb-4">
        {image?.filename ? (
          <Image
            src={image.filename}
            alt={image.alt || name}
            fill
            className="object-fit rounded-md"
          />
        ) : (
          <div className="bg-gray-100 w-full h-full rounded-md flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <h3 className="text-[#1E2B47] font-semibold mb-2 text-center">{name}</h3>
      {size && <p className="text-gray-500 text-sm mb-1">{size}</p>}
      {price && <p className="font-bold text-[#1E2B47]">${price}</p>}
    </div>
    </Link>
  );
};

export default ProductCard;
