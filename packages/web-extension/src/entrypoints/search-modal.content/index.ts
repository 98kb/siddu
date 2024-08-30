import "@repo/search-modal/dist/style.css";
// eslint-disable-next-line sort-imports-es6-autofix/sort-imports-es6
import "./style.css";
import {SearchModal} from "@repo/search-modal";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "search-modal",
      position: "modal",
      onMount: container => {
        container.style.zIndex = "999999999";
        return new SearchModal({target: container});
      },
      onRemove: app => {
        app?.$destroy();
      },
    });
    ui.mount();
  },
});
