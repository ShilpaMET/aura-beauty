'use client';

import { useEffect, useState } from 'react';
import { storyblokEditable, getStoryblokApi } from '@storyblok/react/rsc';
import ProductCard from './ProductCard';
import Filters from './Filters';

const ProductList = ({ blok }: any) => {
  const [filterOpen, setFilterOpen] = useState(blok.filter_open || false);
  const [products, setProducts] = useState<any[]>([]);

    // const { isEnabled } = await draftMode();
  useEffect(() => {
    const fetchProducts = async () => {
      if (!blok.product_refs || blok.product_refs.length === 0) return;
      const storyblokApi = getStoryblokApi();

      // Fetch all product stories based on UUIDs
      const { data } = await storyblokApi.get('cdn/stories', {
        by_uuids: blok.product_refs.join(','),
         version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      });

      setProducts(data.stories);
    };

    fetchProducts();
  }, [blok.product_refs]);

  return (
    <section {...storyblokEditable(blok)} className="bg-[#F8F8F8] min-h-screen py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 px-4">
        <h2 className="text-2xl font-bold text-[#1E2B47]">{blok.title}</h2>

        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
        >
          {filterOpen ? 'Close Filter' : 'Filter'}
        </button>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto flex gap-8 px-4">
        {/* Filters */}
        {filterOpen && (
          <aside className="w-1/4 bg-white border border-gray-200 p-4 rounded-md">
            <Filters filters={blok.filters} />
          </aside>
        )}

        {/* Product Grid */}
        <div className={`grid gap-6 ${filterOpen ? 'grid-cols-3' : 'grid-cols-4'} flex-1`}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.uuid} product={{ ...product.content, full_slug: product.full_slug }} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
