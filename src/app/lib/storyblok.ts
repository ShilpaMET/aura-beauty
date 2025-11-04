// aura-beauty/src/app/lib/storyblok.ts
import { apiPlugin, storyblokInit, getStoryblokApi } from '@storyblok/react';
import Page from '@/app/components/Hero/Page';
import Hero from '@/app/components/Hero/Hero';
import HeroSlider from '@/app/components/Hero/HeroSlider';
import AboutUs from '../components/AboutUs';
import Feature from '../components/Feature';
import Navbar from '../components/Navbar';
import Faq from '../components/FAQ/Faq';
import Footer from '../components/Footer/Footer';
import FooterColumn from '../components/Footer/FooterColumn';
import LinkItem from '../components/Footer/LinkItem';
import FooterContact from '../components/Footer/FooterContact';
import FooterNewsletter from '../components/Footer/FooterNewsletter';

let initialized = false;

export const getStoryblok = () => {
  if (!initialized) {
    storyblokInit({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
      use: [apiPlugin],
      components: {
        navbar: Navbar,
        page: Page,
        hero: Hero,
        hero_slider: HeroSlider,
        about: AboutUs,
        feature: Feature,
        faq: Faq,
        footer: Footer,
        footer_column: FooterColumn,
        footer_contact: FooterContact,
        footer_newsletter: FooterNewsletter,
        link_item: LinkItem,
      },
    });
    initialized = true;
  }
  return getStoryblokApi();
};
