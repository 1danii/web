// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "static",
  site: "https://dani.pw",

  vite: {
    // @ts-expect-error tailwind plugin version mismatch
    plugins: [tailwindcss()],
  },
});
