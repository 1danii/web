import { ogImage } from "@/components/og";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new ImageResponse(ogImage());
};
