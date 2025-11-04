'use client';

import { storyblokEditable } from "@storyblok/react";

const FooterNewsletter = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <h4 className="font-semibold mb-4 text-lg">{blok.title}</h4>
    <p className="text-gray-300 mb-4">{blok.description}</p>

    <form className="flex items-center border border-gray-600 rounded overflow-hidden mb-6">
      <input
        type="email"
        placeholder={blok.input_placeholder}
        className="bg-transparent px-3 py-2 w-full text-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
      >
        {blok.button_label}
      </button>
    </form>

    <p className="mb-2 font-semibold">Payment Available:</p>
    <div className="flex flex-wrap gap-2">
      {blok.payment_logos?.map((img, index) => (
        <img
          key={img.id || index}
          src={img.filename}
          alt="payment"
          className="h-6 w-auto"
        />
      ))}
    </div>
  </div>
);

export default FooterNewsletter;
