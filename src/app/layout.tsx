import "./globals.css";
import { StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokProvider } from "../components/StoryblokProvider";
import Navbar from "../components/layout/Navbar/Navbar";
import { draftMode } from "next/headers";

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  const storyblokApi = getStoryblokApi();
  const { isEnabled } = await draftMode();

  const navbarRes = await storyblokApi.get("cdn/stories/navbar", {
    version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
  });
  const navbarBlok = navbarRes?.data?.story?.content;
  const footerRes = await storyblokApi.get("cdn/stories/footer", {
    version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
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
