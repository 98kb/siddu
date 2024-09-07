import "@repo/fact-composer/dist/style.css";
// eslint-disable-next-line sort-imports-es6-autofix/sort-imports-es6
import "./style.css";
import {ComposerModal} from "@repo/fact-composer";
import {ORM} from "@repo/facts-db";
import {RuntimeAdapter} from "@repo/facts-db-adapter";

// TODO: Create a wrapper for ComposerModal that will handle focus and keyboard events
export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    ctx.addEventListener(document, "focus", e => {
      console.log("here", e);
    });
    ctx.addEventListener(document, "focusin", e => {
      console.log("here", e);
    });
    const ui = await createShadowRootUi(ctx, {
      name: "fact-composer",
      position: "modal",
      isolateEvents: true,
      mode: "closed",
      onMount: container => {
        container.style.zIndex = "999999999";
        return new ComposerModal({
          target: container,
          props: {
            facts: new ORM(new RuntimeAdapter()),
          },
        });
      },
      onRemove: app => {
        app?.$destroy();
      },
    });
    ui.mount();
  },
});
