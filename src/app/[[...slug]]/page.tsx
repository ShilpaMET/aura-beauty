import { StoryblokStory, getStoryblokApi } from '@storyblok/react/rsc';
import { draftMode } from 'next/headers';

export default async function Page({ params }: any) {
  const { isEnabled } = await draftMode();
  const slugArray = await params?.slug;

  // 👇 Build the slug correctly
  const fullSlug = slugArray ? slugArray.join('/') : 'home';

  // 👇 Fetch the Storyblok API client
  const storyblokApi = getStoryblokApi();

  // 👇 Fetch the story (draft when editor/draftMode enabled)
  const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
    version: isEnabled ? 'draft' : 'published',
    cv: Date.now(), // 👈 Forces cache busting during preview
  });

  const story = data?.story;

  if (!story) {
    return <div>Story not found.</div>;
  }

  // 👇 This is what makes Visual Editor clickable/editable
  return (
    <main>
      <StoryblokStory story={story} />
    </main>
  );
}
