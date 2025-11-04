// src/app/serums/[slug]/page.tsx
import { StoryblokProvider } from '@/app/components/StoryblokProvider';
import { getStoryblok } from '@/app/lib/storyblok';

export default async function SerumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const storyblokApi = getStoryblok();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/serums/${slug}`, {
      version: 'draft',
    });

    const body = data.story.content.body || [];
    const product = body.find((b: any) => b.component === 'product');

    if (!product) return <p>Product not found.</p>;

    return (
      <StoryblokProvider>
        <main className='min-h-screen flex flex-col md:flex-row items-center justify-center p-10 gap-10'>
          <div className='w-full md:w-1/2 flex justify-center'>
            {product.image?.filename ? (
              <img
                src={product.image.filename}
                alt={product.name}
                className='w-full max-w-md rounded-2xl shadow-lg object-cover'
              />
            ) : (
              <div className='w-full max-w-md h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500'>
                No Image
              </div>
            )}
          </div>

          <div className='w-full md:w-1/2 space-y-4'>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <p className='text-gray-600'>
              {product.description || 'No description available.'}
            </p>
            <div className='flex items-center gap-4'>
              <p className='text-gray-400 line-through text-lg'>
                ${product.price}
              </p>
              <p className='text-green-600 font-bold text-2xl'>
                ${product.discount_price}
              </p>
            </div>

            <button className='bg-black text-white px-6 py-3 rounded-lg mt-6 hover:bg-gray-800 transition-all'>
              Add to Cart
            </button>
          </div>
        </main>
      </StoryblokProvider>
    );
  } catch (err: any) {
    console.error('Storyblok fetch error:', err.response?.data || err.message);
    return <p>Product not found.</p>;
  }
}
