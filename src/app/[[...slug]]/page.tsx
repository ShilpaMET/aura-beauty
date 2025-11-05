import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { draftMode } from 'next/headers';

export default async function Page({ params }:any) {
    const { isEnabled } = await draftMode();
	const { slug } = await params;

	let fullSlug = slug ? slug.join('/') : 'home';

	const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
    version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
  });
     const story = data.story|| [];
	return <StoryblokStory story={story} />;
}
