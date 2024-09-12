import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import path from "node:path";
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), typescript()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "FactComposer",
      fileName: format => `fact-composer.${format}.js`,
    },
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $ui: path.resolve("./src/lib/components/ui"),
    },
  },
});
