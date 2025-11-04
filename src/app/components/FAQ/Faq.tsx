// src/app/components/Faq.tsx
'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import FaqItem from './FaqItem';
import FaqContact from './FaqContact';

const Faq = ({ blok }: any) => {
  return (
    <section
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 py-16 px-4 items-center"
      {...storyblokEditable(blok)}
    >
      {/* Left: FAQ List */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">{blok.name}</h2>
        <p className="text-gray-500 mb-6">{blok.description}</p>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {blok.faq_item?.map((faqBlok: any) => (
            <FaqItem blok={faqBlok} key={faqBlok._uid} />
          ))}
        </div>
      </div>

      {/* Right: Contact Box */}
      <div className="self-center md:ml-auto mt-13">
        {blok.faq_contact && <FaqContact blok={blok.faq_contact[0]} />}
      </div>
    </section>
  );
};

export default Faq;
