import linaria from "@wyw-in-js/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { UserConfigExport } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    linaria({
      include: ["src/**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
    VitePWA({
      manifest: {
        short_name: "Pomodoro",
        name: "Pomodoro",
        icons: [{ src: "icon.svg", sizes: "any" }],
        start_url: ".",
        display: "standalone",
        theme_color: "steelblue",
        background_color: "steelblue",
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts{,x}"],
    setupFiles: "src/test.ts",
  },
} satisfies UserConfigExport);
