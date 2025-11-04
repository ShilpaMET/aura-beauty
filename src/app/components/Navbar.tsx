"use client";

import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa"; 

export default function Navbar({ blok }: { blok: any }) {
  console.log("Full navbar blok:", JSON.stringify(blok, null, 2));

  const logo = blok?.logo?.filename || "";
  const tableData = blok?.menu_items?.[0]?.items;

  const menuItems =
    tableData?.fieldtype === "table" && Array.isArray(tableData?.tbody)
      ? tableData.tbody
          .map((row: any) => {
            const cells = row.body || [];
            const name = cells[0]?.value?.trim() || "";
            const link = cells[1]?.value?.trim() || "#";
            return name ? { name, link } : null;
          })
          .filter(Boolean)
      : [];
  return (
    <nav
      {...storyblokEditable(blok)}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#0b2341] text-white px-8 py-4 shadow-md"
    >
      {/* Logo */}
      {logo && (
        <Image
          src={logo}
          alt="Logo"
          width={140}
          height={50}
          className="object-contain"
        />
      )}

      <div className="flex space-x-8 text-sm font-medium">
        {menuItems.length > 0 ? (
          menuItems.map((item, i) => (
            <Link key={i} href={item.link}>
              {item.name}
            </Link>
          ))
        ) : (
          <span className="text-gray-400 text-sm">No menu items</span>
        )}
      </div>
      {blok.show_icons && (
        <div className="flex space-x-5 text-xl">
          <button aria-label="Search">
            <FaSearch className="hover:text-gray-300 transition-colors" />
          </button>
          <button aria-label="Cart">
            <FaShoppingCart className="hover:text-gray-300 transition-colors" />
          </button>
        </div>
      )}
    </nav>
  );
}
