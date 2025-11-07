'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react';

export default function Page({ blok }: any) {
  return (
    <div
      className="space-y-10"
      {...storyblokEditable(blok)} 
    >
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
