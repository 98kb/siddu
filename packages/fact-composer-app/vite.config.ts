import path from "path";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_TAG__: JSON.stringify(Date.now()),
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "dd",
      formats: ["es"],
      fileName: () => `index.js`,
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
