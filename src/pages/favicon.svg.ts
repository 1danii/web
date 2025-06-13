import { colors } from "@/colors";
import { Star } from "@/components/logo/logo";
import type { APIRoute } from "astro";
import { renderToString } from "react-dom/server";

export const GET: APIRoute = () => {
  const style = `
  <style>
      path {
        fill: ${colors.dark};
      }
      @media (prefers-color-scheme: dark) {
        path { fill: ${colors.light}; }
      }
    </style>
  `;
  const svg = renderToString(Star({})).replace("</svg>", style + "</svg>");

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
};
