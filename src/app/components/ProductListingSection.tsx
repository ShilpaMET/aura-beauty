// src/app/components/ProductListingSection.tsx
'use client';
import React, { useState } from 'react';
import { StoryblokComponent } from '@storyblok/react';

export default function ProductListingSection({ blok }) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{blok.title || 'Products'}</h1>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
        >
          {filterOpen ? 'Close Filter' : 'Filter'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filters Section */}
        {filterOpen && blok.filters && (
          <aside className="w-64 shrink-0 border border-gray-200 p-6 rounded-lg h-fit bg-white">
            {blok.filters.map((filterBlok) => {
              return <StoryblokComponent blok={filterBlok} key={filterBlok._uid} />;
            })}
          </aside>
        )}

        {/* Products Grid */}
        <div
          className={`grid gap-8 ${
            filterOpen
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          } flex-1`}
        >
          {blok.products?.map((productBlok) => {
            return <StoryblokComponent blok={productBlok} key={productBlok._uid} />;
          })}
        </div>
      </div>
    </section>
  );
}
