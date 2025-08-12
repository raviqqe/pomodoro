import { reactRouter } from "@react-router/dev/vite";
import defaultWyw from "@wyw-in-js/vite";
import { defaultImport } from "default-import";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const wyw = defaultImport(defaultWyw);

export default defineConfig({
  esbuild: {
    legalComments: "external",
  },
  plugins: [
    reactRouter(),
    wyw({
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
      include: ["src/**/*.{ts,tsx}"],
    }),
    VitePWA({
      manifest: {
        background_color: "steelblue",
        display: "standalone",
        icons: [{ sizes: "any", src: "icon.svg" }],
        name: "Pomodoro",
        short_name: "Pomodoro",
        start_url: ".",
        theme_color: "steelblue",
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
  ssr: {
    noExternal: ["react-spinners"],
  },
});
