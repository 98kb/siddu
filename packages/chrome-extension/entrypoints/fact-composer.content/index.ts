import "@repo/fact-composer/dist/style.css";
import {AuthClient} from "@repo/chrome-auth-service";
import {createApp} from "@repo/fact-composer";
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
      css: "position:absolute;top:0;left:0;",
      zIndex: 999999999,
      onMount(container) {
        const root = document.createElement("div");
        root.id = "root";
        container.append(root);

        const client = createRuntimeClient();
        createApp(root, {
          collection: client.collection,
          auth: new AuthClient(client.auth),
          backup: client.backup,
        });
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
