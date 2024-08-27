import "@repo/search-modal/dist/style.css";
import {SearchModal} from "@repo/search-modal";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "search-modal",
      position: "modal",
      onMount: container => {
        return new SearchModal({target: container});
      },
      onRemove: app => {
        app?.$destroy();
      },
    });
    ui.mount();
  },
});
