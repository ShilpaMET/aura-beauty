'use client';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Footer = ({ blok }) => {
  return (
    <footer
      className="bg-[#0b1631] text-white py-12 text-sm"
      {...storyblokEditable(blok)}
    >
      {/* Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {blok.columns?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 px-6">
        <p className="text-center md:text-left">{blok.copyright}</p>

        {/* Social icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          {blok.social_links?.map((link, index) => (
            <a
              key={link._uid || index}
              href={link.url?.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <img src={link.icon?.filename} alt="social" className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
