'use client';

import { storyblokEditable } from "@storyblok/react";

const FooterContact = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <h4 className="font-semibold mb-4 text-lg">{blok.title}</h4>

    <div className="mb-4">
      <p className="font-semibold">{blok.order_title}</p>
      <p>{blok.order_phone}</p>
      <p>{blok.order_email}</p>
    </div>

    <div>
      <p className="font-semibold">{blok.inquiry_title}</p>
      <p>{blok.inquiry_phone}</p>
      <p>{blok.inquiry_email}</p>
    </div>
  </div>
);

export default FooterContact;
