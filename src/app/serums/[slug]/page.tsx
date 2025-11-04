// src/app/serums/[slug]/page.tsx
import '../../lib/storyblok'; // ensure storyblokInit is run
import { getStoryblokApi, StoryblokComponent } from '@storyblok/react';
import { StoryblokProvider } from '@/app/components/StoryblokProvider';

export default async function SerumDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/serums/${slug}`, {
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
