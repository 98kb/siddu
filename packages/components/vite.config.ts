import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "components",
      formats: ["es"],
      fileName: () => `index.js`,
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
