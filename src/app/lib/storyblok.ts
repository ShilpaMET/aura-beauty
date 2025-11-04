// aura-beauty/src/app/lib/storyblok.ts
import { apiPlugin, storyblokInit, getStoryblokApi } from '@storyblok/react';
import Page from '@/app/components/Page';
import Hero from '@/app/components/Hero';
import HeroSlider from '@/app/components/HeroSlider';
import AboutUs from '../components/AboutUs';
import Feature from '../components/Feature';
import Navbar from "../components/Navbar";

let initialized = false;

export const getStoryblok = () => {
  if (!initialized) {
    storyblokInit({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
      use: [apiPlugin],
      components: {
        navbar : Navbar,
        page: Page,
        hero: Hero,
        hero_slider: HeroSlider,
        about: AboutUs,
        feature: Feature,
      },
    });
    initialized = true;

  }
  return getStoryblokApi();
};
