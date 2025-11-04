import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface AboutUsProps {
  blok: SbBlokData & {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: {
      filename: string;
      alt?: string;
    };
    button_text?: string;
    button_link?: string;
  };
}

// ✅ Server Component
export default function AboutUs({ blok }: AboutUsProps) {
  return (
    <section
      {...storyblokEditable(blok)}
      className='max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-12'
    >
      {/* Image Section */}
      {blok.image?.filename && (
        <div className='flex justify-center md:justify-end'>
          <img
            src={blok.image.filename}
            alt={blok.image.alt || blok.title || 'About us image'}
            className='w-full max-w-sm rounded-2xl object-cover shadow-md'
          />
        </div>
      )}

      {/* Text Section */}
      <div className='text-left space-y-5'>
        {blok.subtitle && (
          <p className='text-sm uppercase tracking-wide text-gray-500'>
            {blok.subtitle}
          </p>
        )}
        {blok.title && (
          <h2 className='text-3xl md:text-4xl font-semibold text-gray-900'>
            {blok.title}
          </h2>
        )}
        {blok.description && (
          <p className='text-gray-600 leading-relaxed text-base md:text-lg'>
            {blok.description}
          </p>
        )}

        {/* CTA Button */}
        {blok.button_text && (
          <a
            href={blok.button_link || '#'}
            className='inline-flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition-all duration-200'
          >
            {blok.button_text}
            <span aria-hidden='true'>↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
