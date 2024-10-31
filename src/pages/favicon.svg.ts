import { Star } from "@/components/logo/logo";
import type { APIRoute } from "astro";
import { renderToString } from "react-dom/server";
import tailwindConfig from "tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";

// @ts-ignore
const { theme } = resolveConfig(tailwindConfig);

export const GET: APIRoute = () => {
  const style = `
  <style>
  path {
        fill: ${(theme.colors as any).background};
      }
      @media (prefers-color-scheme: dark) {
        path { fill: ${(theme.colors as any).foreground}; }
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
