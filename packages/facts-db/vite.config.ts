import {defineConfig} from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    testTimeout: 10_000,
    hookTimeout: 10_000,
  },
});
