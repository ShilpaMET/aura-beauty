"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Hero from "@/app/components/Hero";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN, // from your Storyblok public token
  use: [apiPlugin],
  components: {
    hero: Hero,
  },
});

export const StoryblokProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
