'use client';

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const FooterColumn = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <h4 className="font-semibold mb-4 text-lg">{blok.title}</h4>
    <ul className="space-y-2 text-gray-300">
      {blok.links?.map((link) => (
        <StoryblokComponent blok={link} key={link._uid} />
      ))}
    </ul>
  </div>
);

export default FooterColumn;
