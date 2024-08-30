// vite.config.ts
import { defineConfig } from "file:///Users/yashodhansingh/Code/github/98/node_modules/.pnpm/vite@5.4.2_@types+node@22.5.0/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/yashodhansingh/Code/github/98/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@3.1.2_svelte@4.2.19_vite@5.4.2_@types+node@22.5.0_/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import typescript from "file:///Users/yashodhansingh/Code/github/98/node_modules/.pnpm/@rollup+plugin-typescript@11.1.6_rollup@4.21.0_tslib@2.7.0_typescript@5.5.4/node_modules/@rollup/plugin-typescript/dist/es/index.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/yashodhansingh/Code/github/98/packages/notes-web-app";
var vite_config_default = defineConfig({
  plugins: [svelte(), typescript()],
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "NotesWebApp",
      fileName: (format) => `notes-web-app.${format}.js`
    }
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveWFzaG9kaGFuc2luZ2gvQ29kZS9naXRodWIvOTgvcGFja2FnZXMvbm90ZXMtd2ViLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lhc2hvZGhhbnNpbmdoL0NvZGUvZ2l0aHViLzk4L3BhY2thZ2VzL25vdGVzLXdlYi1hcHAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3lhc2hvZGhhbnNpbmdoL0NvZGUvZ2l0aHViLzk4L3BhY2thZ2VzL25vdGVzLXdlYi1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSAnQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZSdcbmltcG9ydCB0eXBlc2NyaXB0IGZyb20gJ0Byb2xsdXAvcGx1Z2luLXR5cGVzY3JpcHQnO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtzdmVsdGUoKSwgdHlwZXNjcmlwdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAnTm90ZXNXZWJBcHAnLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBub3Rlcy13ZWItYXBwLiR7Zm9ybWF0fS5qc2AsXG4gICAgfVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICRsaWI6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2xpYlwiKSxcbiAgICB9LFxuICB9LFxufSlcblxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVyxTQUFTLG9CQUFvQjtBQUNoWSxTQUFTLGNBQWM7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0FBQUEsRUFDaEMsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzdDLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxXQUFXLGlCQUFpQixNQUFNO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEtBQUssUUFBUSxXQUFXO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
