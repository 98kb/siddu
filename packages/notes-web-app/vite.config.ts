import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import typescript from '@rollup/plugin-typescript';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), typescript()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NotesWebApp',
      fileName: (format) => `notes-web-app.${format}.js`,
    }
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
})
