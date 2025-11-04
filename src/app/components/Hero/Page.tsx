// aura-beauty/src/app/components/Page.tsx
'use client';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';

const Page = ({ blok }:any) => (
  <div {...storyblokEditable(blok)}>
    {blok.body?.map((nestedBlok:any) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </div>
);

export default Page;
