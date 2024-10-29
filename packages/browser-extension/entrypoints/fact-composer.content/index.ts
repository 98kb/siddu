import "@repo/fact-composer-app/dist/style.css";
// eslint-disable-next-line sort-imports-es6-autofix/sort-imports-es6
import "./style.css";
import {DbClient, TRPCService} from "@repo/facts-db";
import {createApp} from "@repo/fact-composer-app";
import {createRuntimeClient} from "@/lib/background/createRuntimeClient";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: "fact-composer",
      position: "overlay",
      isolateEvents: true,
      mode: "closed",
      onMount(container) {
        const root = document.createElement("div");
        root.id = "root";
        container.append(root);

        const client = createRuntimeClient();
        createApp(root, {
          db: new DbClient(table => new TRPCService(table, client.db)),
          auth: client.auth,
          backup: client.backup,
        });
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
