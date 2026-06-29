import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    reactRouter(),
    VitePWA({
      // biome-ignore-start lint/style/useNamingConvention: PWA manifest
      manifest: {
        background_color: "steelblue",
        display: "standalone",
        icons: [
          {
            purpose: "maskable",
            sizes: "any",
            src: "icon.svg",
          },
        ],
        name: "Pomodoro",
        short_name: "Pomodoro",
        start_url: ".",
        theme_color: "steelblue",
        // biome-ignore-end lint/style/useNamingConvention: PWA manifest
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
});
