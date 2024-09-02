import {defineConfig} from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    testTimeout: 100_000_000,
    hookTimeout: 100_000_000,
  },
});
