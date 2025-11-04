'use client';

import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import Hero from '@/app/components/Hero';
import Feature from './Feature';
import AboutUs from './AboutUs';
import Navbar from "./Navbar";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    navbar: Navbar,
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
