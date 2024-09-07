import "@repo/fact-composer/dist/style.css";
// eslint-disable-next-line sort-imports-es6-autofix/sort-imports-es6
import "./style.css";
import {createComposerModal} from "./createComposerModal";

// TODO: Create a wrapper for ComposerModal that will handle focus and keyboard events
export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "fact-composer",
      position: "modal",
      isolateEvents: true,
      mode: "closed",
      onMount: createComposerModal,
      onRemove: app => {
        app?.$destroy();
      },
    });
    ui.mount();
  },
});
