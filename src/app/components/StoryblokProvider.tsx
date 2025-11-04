'use client';

import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import Hero from '@/app/components/Hero/Hero';
import Feature from './Feature';
import AboutUs from './AboutUs';
import Navbar from './Navbar';
import Faq from './FAQ/Faq';
import FaqItem from './FAQ/FaqItem';
import FaqContact from './FAQ/FaqContact';
import Footer from './Footer/Footer';
import FooterColumn from './Footer/FooterColumn';
import LinkItem from './Footer/LinkItem';
import FooterContact from './Footer/FooterContact';
import FooterNewsletter from './Footer/FooterNewsletter';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    navbar: Navbar,
    hero: Hero,
    about: AboutUs,
    feature: Feature,
    faq: Faq,
    'faq-item': FaqItem,
    'faq-contact': FaqContact,
    footer: Footer,
    footer_column: FooterColumn,
    footer_contact: FooterContact,
    footer_newsletter: FooterNewsletter,
    link_item: LinkItem,
  },
});

export const StoryblokProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};
