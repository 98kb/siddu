import "dotenv/config";
import {defineConfig} from "wxt";
import {env} from "./env";

// See https://wxt.dev/api/config.html
export default defineConfig({
  outDir: "dist",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["alarms", "storage", "contextMenus", "identity"],
    oauth2: {
      client_id: env.WXT_OAUTH_CLIENT_ID,
      scopes: [
        "email",
        "https://www.googleapis.com/auth/drive.appdata",
        "https://www.googleapis.com/auth/drive.appfolder",
      ],
    },
  },
});
