import "@repo/fact-composer-app/dist/style.css";
import { createApp } from "@repo/fact-composer-app";
import { DbClient, createMemoryAdapter } from "@repo/facts-db";

const db = new DbClient(createMemoryAdapter);

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: "example-ui",
      position: "inline",
      isolateEvents: true,
      mode: "closed",
      onMount(container) {
        const root = document.createElement("div");
        root.id = "root";
        container.appendChild(root);
        createApp(root, { db });
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
