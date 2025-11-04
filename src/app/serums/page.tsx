// src/app/serums/page.tsx
import { getStoryblok } from '@/app/lib/storyblok';
import { StoryblokComponent } from '@storyblok/react';

export default async function SerumsPage() {
  const storyblokApi = getStoryblok();
  const { data } = await storyblokApi.get('cdn/stories/serums', {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    resolve_relations: ['product_listing_section.product_items'],
  });

  return (
    <main className='min-h-screen bg-gray-50 p-8'>
      <StoryblokComponent blok={data.story.content} />
    </main>
  );
}
