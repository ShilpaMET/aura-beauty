import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const draft = await draftMode();
  draft.enable();

  redirect(`/${slug}?${searchParams.toString()}`);
};