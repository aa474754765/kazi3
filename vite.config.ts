import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import visualizer from "rollup-plugin-visualizer";

const plugins = [];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...plugins,
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
