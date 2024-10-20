import "@repo/fact-composer-app/dist/style.css";
import "./style.css";
import { createApp } from "@repo/fact-composer-app";
import { createDbClient } from "./createDbClient";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: "fact-composer",
      position: "inline",
      isolateEvents: true,
      mode: "closed",
      onMount(container) {
        const root = document.createElement("div");
        root.id = "root";
        container.append(root);
        createApp(root, { db: createDbClient() });
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
