// src/app/page.tsx
import { StoryblokComponent } from '@storyblok/react';
import { StoryblokProvider } from '@/app/components/StoryblokProvider';
import { getStoryblok } from './lib/storyblok';

export default async function HomePage() {
  const storyblokApi = getStoryblok();

  const { data } = await storyblokApi.get('cdn/stories/home', {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });

  const body = data.story.content.body || [];

  return (
    <StoryblokProvider>
      <main>
        {body.map((blok: any) =>  (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </main>
    </StoryblokProvider>
  );
}
