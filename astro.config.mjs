// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "static",
  site: "https://dani.pw",
  vite: {
    // @ts-expect-error astro types
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "SF Pro Display",
      cssVariable: "--font-sf-pro",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/SF-Pro-Display-Light.otf"],
            weight: "300",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/SF-Pro-Display-Regular.otf"],
            weight: "400",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/SF-Pro-Display-Medium.otf"],
            weight: "500",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/SF-Pro-Display-Semibold.otf"],
            weight: "600",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/SF-Pro-Display-Bold.otf"],
            weight: "700",
            style: "normal",
          },
        ],
      },
    },
  ],
});
