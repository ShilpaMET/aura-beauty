import "./globals.css";
import { StoryblokComponent } from "@storyblok/react";
import { getStoryblok } from "./lib/storyblok";
import { StoryblokProvider } from "./components/StoryblokProvider";
import Navbar from "./components/Navbar";

export default async function RootLayout({ children }) {
  const storyblokApi = getStoryblok();

  const navbarRes = await storyblokApi.get("cdn/stories/navbar", {
    version: "draft",
  });
  const navbarBlok = navbarRes?.data?.story?.content;
  const footerRes = await storyblokApi.get("cdn/stories/footer", {
    version: "draft",
  });
  const footerBlok = footerRes?.data?.story?.content;

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <StoryblokProvider>
          {navbarBlok?.body?.[0] && <Navbar blok={navbarBlok.body[0]} />}

          <main>{children}</main>

          {footerBlok?.body?.[0] && (
            <StoryblokComponent blok={footerBlok.body[0]} />
          )}
        </StoryblokProvider>
      </body>
    </html>
  );
}
