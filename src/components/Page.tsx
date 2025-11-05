// aura-beauty/src/app/components/Page.tsx
import { StoryblokComponent } from '@storyblok/react';

export default function Page({ blok }: any) {
  return (
    <div className='space-y-10'>
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
