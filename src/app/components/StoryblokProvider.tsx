'use client';

import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import Feature from './Feature';
import AboutUs from './AboutUs';
import ProductListingSection from './ProductListingSection';
import Product from './Product';
import Navbar from './Navbar';
import Hero from './Hero/Hero';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    navbar: Navbar,
    hero: Hero,
    about: AboutUs,
    feature: Feature,
    product_listing_section: ProductListingSection,
    product: Product,
  },
});

export const StoryblokProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};
