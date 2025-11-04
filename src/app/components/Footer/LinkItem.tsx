'use client';

import { storyblokEditable } from "@storyblok/react";

const LinkItem = ({ blok }) => (
  <li {...storyblokEditable(blok)}>
    <a href={blok.link?.url} className="hover:underline">
      {blok.label}
    </a>
  </li>
);

export default LinkItem;
