// app/api/draft/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "home";

  const draft = await draftMode();
  draft.enable();

  const params = new URLSearchParams(searchParams);

  if (!params.has("_storyblok")) {
    params.append("_storyblok", "1");
  }

  const queryString = params.toString();
  const redirectUrl = `/${slug}?${queryString}`;

  redirect(redirectUrl);
};
