// src/app/page.tsx
import { getStoryblok } from './lib/storyblok';
getStoryblok(); // 👈 initialize here immediately

import { StoryblokComponent } from '@storyblok/react';
import { StoryblokProvider } from '@/app/components/StoryblokProvider';

export default async function HomePage() {
  const storyblokApi = getStoryblok();
  const { data } = await storyblokApi.get('cdn/stories/home', {
    version: 'draft',
  });

  return (
    <StoryblokProvider>
      <main>
        <StoryblokComponent blok={data.story.content} />
      </main>
    </StoryblokProvider>
  );
}
