'use client';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaXTwitter } from "react-icons/fa6";


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
        <div className="flex gap-3 mt-4 md:mt-0">
          {blok.social_links?.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-300 hover:text-white hover:border-white transition"
            >
              {link.includes('facebook') && <FaFacebookF className="w-4 h-4" />}
              {link.includes('instagram') && <FaInstagram className="w-4 h-4" />}
              {link.includes('x.com') && <FaXTwitter className="w-4 h-4" />}
              {link.includes('pinterest') && <FaPinterestP className="w-4 h-4" />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
