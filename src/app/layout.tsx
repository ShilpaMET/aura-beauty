// src/app/layout.tsx
import './components/StoryblokProvider';
import './globals.css';
import './lib/storyblok';

import { StoryblokComponent } from '@storyblok/react';
import { getStoryblok } from './lib/storyblok';
import { StoryblokProvider } from './components/StoryblokProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storyblokApi = getStoryblok();

  // Fetch your global footer
  const { data } = await storyblokApi.get('cdn/stories/footer', {
    version: 'draft', // change to "published" in production
  });

  const footerContent = data.story?.content;

  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-900'>
        <StoryblokProvider>
          {children}
          {footerContent?.body?.[0] && (
            <StoryblokComponent blok={footerContent.body[0]} />
          )}
        </StoryblokProvider>
      </body>
    </html>
  );
}
