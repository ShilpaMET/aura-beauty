// src/app/components/StoryblokProvider.tsx
'use client';

import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import Hero from '@/app/components/Hero';
import Feature from './Feature';
import AboutUs from './AboutUs';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    hero: Hero,
    about: AboutUs,
    feature: Feature,
  },
});

export const StoryblokProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};
