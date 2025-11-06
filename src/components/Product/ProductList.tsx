'use client';

import { useEffect, useState, useMemo } from 'react';
import { storyblokEditable, getStoryblokApi } from '@storyblok/react/rsc';
import ProductCard from './ProductCard';
import Filters from './Filters';

const ProductList = ({ blok }: any) => {
  const [filterOpen, setFilterOpen] = useState(blok.filter_open || false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>('A - Z');

  useEffect(() => {
    const defaults: Record<string, any> = {};
    blok.filters?.forEach((f: any) => {
      if (f.filter_type === 'range') {
        defaults[f.group_name] = {
          min: f.min_price ?? 0,
          max: f.max_price ?? Infinity,
        };
      } else if (f.filter_type === 'checkbox') {
        defaults[f.group_name] = [];
      } else if (f.filter_type === 'switch') {
        defaults[f.group_name] = null;
      }
    });
    setSelectedFilters(defaults);
  }, [blok.filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!blok.product_refs || blok.product_refs.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get('cdn/stories', {
          by_uuids: blok.product_refs.join(','),
          version:
            process.env.NODE_ENV === 'development' ? 'draft' : 'published',
        });

        setProducts(data.stories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [blok.product_refs]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const content = product.content;

      for (const [group, value] of Object.entries(selectedFilters)) {
        // Skip inactive filters
        if (value == null) continue;
        if (Array.isArray(value) && value.length === 0) continue;
        if (
          typeof value === 'object' &&
          value.min === 0 &&
          value.max === Infinity
        )
          continue;

        if (Array.isArray(value)) {
          const field = group.toLowerCase();
          if (
            !value.some(
              (v) => content[field]?.includes(v) || content[field] === v,
            )
          ) {
            return false;
          }
        }

        if (
          typeof value === 'object' &&
          value.min !== undefined &&
          value.max !== undefined
        ) {
          const price = parseFloat(content.price || 0);
          if (price < value.min || price > value.max) {
            return false;
          }
        }

        if (typeof value === 'boolean') {
          const available = content.availability ?? false;
          if (available !== value) {
            return false;
          }
        }
      }

      return true;
    });
  }, [products, selectedFilters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (!sortOption) return sorted;

    if (sortOption === 'A - Z') {
      sorted.sort((a, b) =>
        a.content.name.localeCompare(b.name, undefined, {
          sensitivity: 'base',
        }),
      );
    } else if (sortOption === 'Z - A') {
      sorted.sort((a, b) =>
        b.content.name.localeCompare(a.name, undefined, {
          sensitivity: 'base',
        }),
      );
    } else if (sortOption === 'price') {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.content.discount_price || 0);
        const priceB = parseFloat(b.content.discount_price || 0);
        return priceA - priceB;
      });
    }

    return sorted;
  }, [filteredProducts, sortOption]);

  return (
    <section
      {...storyblokEditable(blok)}
      className='bg-[#F8F8F8] min-h-screen py-10'
    >
      <div className='max-w-7xl mx-auto flex justify-between items-center mb-8 px-4'>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className='border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100'
        >
          {filterOpen ? 'Close Filter' : 'Filter'}
        </button>

        <div className='flex items-center gap-2'>
          <label htmlFor='sort' className='text-gray-700 text-sm'>
            Sort by:
          </label>
          <select
            id='sort'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className='border border-gray-300 px-3 py-2 rounded-md text-sm'
          >
            {blok.sort_options?.map((opt: string, idx: number) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='max-w-7xl mx-auto flex gap-8 px-4 flex-wrap'>
        {filterOpen && (
          <aside className='w-full lg:w-1/4 bg-white border border-gray-200 p-4 rounded-xl shadow-sm mx-auto'>
            <Filters
              filters={blok.filters}
              appliedFilters={selectedFilters}
              onApplyFilters={setSelectedFilters}
            />
          </aside>
        )}

        <div
          className={`grid gap-6 flex-1 sm:grid-cols-2 md:grid-cols-3 lg:${filterOpen ? 'grid-cols-3' : 'grid-cols-4'} xl:${filterOpen ? 'grid-cols-3' : 'grid-cols-5'}`}
        >
          {loading ? (
            <div className='col-span-full flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#1E2B47]' />
            </div>
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard
                key={product.uuid}
                product={{ ...product.content, full_slug: product.full_slug }}
              />
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
