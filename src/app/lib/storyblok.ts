import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react";
import Page from "@/app/components/Page";
import Hero from "@/app/components/Hero";
import HeroSlider from "@/app/components/HeroSlider";

let initialized = false;

export const getStoryblok = () => {
  if (!initialized) {
    storyblokInit({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN, 
      use: [apiPlugin],
      components: {
        page: Page,
        hero: Hero,
        hero_slider: HeroSlider,
      },
    });
    initialized = true;
  }
  return getStoryblokApi();
};
