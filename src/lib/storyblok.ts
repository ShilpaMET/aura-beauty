// aura-beauty/src/app/lib/storyblok.ts
import { apiPlugin, storyblokInit } from '@storyblok/react';
import Page from '@/components/Hero/Page';
import Hero from '@/components/Hero/Hero';
import HeroSlider from '@/components/Hero/HeroSlider';
import AboutUs from '../components/Home/AboutUs';
import Feature from '../components/Home/Feature';
import Navbar from '../components/layout/Navbar/Navbar';
import Faq from '../components/FAQ/Faq';
import Footer from '../components/layout/Footer/Footer';
import FooterColumn from '../components/layout/Footer/FooterColumn';
import LinkItem from '../components/layout/Footer/LinkItem';
import FooterContact from '../components/layout/Footer/FooterContact';
import FooterNewsletter from '../components/layout/Footer/FooterNewsletter';
import AboutHero from '@/components/About/AboutHero';
import Marquee from '@/components/About/Marquee';
import OurTeam from '@/components/About/OurTeam';
import ProductList from '@/components/Product/ProductList';
import Product from '@/components/Product/Product';
import Filters from '@/components/Product/Filters';

export const getStoryblokApi = storyblokInit({
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
    about_hero: AboutHero,
    marquee: Marquee,
    our_team: OurTeam,
    product_list:ProductList,
    product: Product,
    filter_group:Filters
  },
  // apiOptions: {
  // 	region: 'eu',
  // 	endpoint: process.env.STORYBLOK_API_BASE_URL
  // 		? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
  // 		: undefined,
  // },
});
