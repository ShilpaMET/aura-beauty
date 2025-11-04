// aura-beauty/src/app/hero/page.tsx
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblok } from '@/app/lib/storyblok';
import { StoryblokProvider } from '@/app/components/StoryblokProvider';
import { StoryblokComponent } from '@storyblok/react';
export default async function Hero() {
  const storyblokApi = getStoryblok();
  const { data } = await storyblokApi.get('cdn/stories/home', {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  const heroBlok = data.story.content.body?.find(
    (blok: any) => blok.component === 'hero',
  );

  return (
    <StoryblokProvider>
      {heroBlok ? (
        <StoryblokComponent blok={heroBlok} />
      ) : (
        <p>No hero section found in Storyblok</p>
      )}
    </StoryblokProvider>
  );
}
