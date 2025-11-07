// app/api/draft/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slugParam = searchParams.get("slug");

    // Fallback to home if slug is missing
    const slug = slugParam ? slugParam.replace(/^\/+/, "") : "home";

    // Enable draft mode
    const draft = await draftMode();
    draft.enable();

    // Rebuild query string *without* duplicating slug
    searchParams.delete("slug");
    const query = searchParams.toString();
    const finalUrl = query
      ? `/${slug}?${query}&_storyblok=1`
      : `/${slug}?_storyblok=1`;

    // Redirect to live page with draft mode on
    return redirect(finalUrl);
  } catch (err) {
    console.error("Error in /api/draft route:", err);
    return new Response("Draft route error", { status: 500 });
  }
}
