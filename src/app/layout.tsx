import './globals.css';
import { StoryblokComponent } from '@storyblok/react';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokProvider } from '../components/StoryblokProvider';
import Navbar from '../components/layout/Navbar/Navbar';
import { draftMode } from 'next/headers';
import Footer from '@/components/layout/Footer/Footer';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storyblokApi = getStoryblokApi();
  const { isEnabled } = await draftMode();

   const layoutRes = await storyblokApi.get('cdn/stories/layout', {
    version:
      process.env.NODE_ENV === 'development' || isEnabled
        ? 'draft'
        : 'published',
  });
  const layoutBlok = layoutRes?.data?.story?.content;
  console.log(layoutBlok);
  
  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-900'>
        <StoryblokProvider>
          {layoutBlok?.body?.[0] && <Navbar blok={layoutBlok.body[0]} />}
          <main className='pt-[65]'>{children}</main>
          {layoutBlok?.body?.[1] && <Footer blok={layoutBlok.body[1]} />}
        </StoryblokProvider>
      </body>
    </html>
  );
}
