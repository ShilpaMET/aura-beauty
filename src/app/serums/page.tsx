// src/app/serums/page.tsx
import { getStoryblok } from '@/app/lib/storyblok';
import { StoryblokComponent } from '@storyblok/react';
import { draftMode } from 'next/headers';

export default async function SerumsPage() {
  const storyblokApi = getStoryblok();
  const { isEnabled } = await draftMode();
  
  const { data } = await storyblokApi.get('cdn/stories/serums', {
    version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
    resolve_relations: ['product_listing_section.product_items'],
  });

  return (
    <main className='min-h-screen bg-gray-50 p-8'>
      <StoryblokComponent blok={data.story.content} />
    </main>
  );
}
