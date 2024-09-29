import "@repo/dd/dist/style.css";
import {createApp} from "@repo/dd";

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: "ui",
  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: "inline",
      isolateEvents: true,
      mode: "closed",
      onMount(container) {
        // const root = document.createElement('div');
        // root.id = 'root';
        // container.appendChild(root);
        createApp(container);
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
