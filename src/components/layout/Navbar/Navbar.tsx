'use client';

import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

export default function Navbar({ blok }: { blok: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const logo = blok?.logo?.filename || '';
  const tableData = blok?.menu_items?.[0]?.items;

  const menuItems =
    tableData?.fieldtype === 'table' && Array.isArray(tableData?.tbody)
      ? tableData.tbody
          .map((row: any) => {
            const cells = row.body || [];
            const name = cells[0]?.value?.trim() || '';
            const link = cells[1]?.value?.trim() || '#';
            return name ? { name, link } : null;
          })
          .filter(Boolean)
      : [];

  return (
    <nav
      {...storyblokEditable(blok)}
      className='fixed top-0 left-0 right-0 z-50 bg-[#faf9f8] text-[#2e2e2e] shadow-sm'
    >
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Left - Menu */}
        <div className='hidden md:flex space-x-6 text-sm font-medium'>
          {menuItems.map((item: any, i: number) => (
            <Link
              key={i}
              href={item.link}
              className='hover:text-[#7b6f6f] transition-colors'
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Center - Logo */}
        <div className='flex justify-center items-center'>
          {logo && (
            <Image
              src={logo}
              alt='Logo'
              width={120}
              height={50}
              className='object-contain'
            />
          )}
        </div>

        {/* Right - Icons */}
        {blok.show_icons && (
          <div className='flex space-x-5 text-[18px] items-center'>
            <button aria-label='Search'>
              <FaSearch className='hover:text-[#7b6f6f] transition' />
            </button>
            <button aria-label='Account'>
              <FaUser className='hover:text-[#7b6f6f] transition' />
            </button>
            <button aria-label='Cart'>
              <FaShoppingCart className='hover:text-[#7b6f6f] transition' />
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className='md:hidden text-[20px]'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-[#faf9f8] shadow-md'>
          <div className='flex flex-col space-y-4 py-4 text-center'>
            {menuItems.map((item: any, i: number) => (
              <Link
                key={i}
                href={item.link}
                className='text-sm font-medium hover:text-[#7b6f6f] transition-colors'
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {blok.show_icons && (
              <div className='flex justify-center space-x-6 text-[18px] mt-2'>
                <FaSearch />
                <FaUser />
                <FaShoppingCart />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
