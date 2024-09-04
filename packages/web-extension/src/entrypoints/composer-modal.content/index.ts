import "@repo/fact-composer/dist/style.css";
// eslint-disable-next-line sort-imports-es6-autofix/sort-imports-es6
import "./style.css";
import {FactsORM} from "@repo/facts-db";
import {RuntimeAdapter} from "@repo/runtime-messaging";
import {SearchModal} from "@repo/fact-composer";

document.addEventListener("keydown", e => {
  console.log("keydown", e);
});
export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "fact-composer",
      position: "modal",
      isolateEvents: true,
      mode: "closed",
      onMount: container => {
        container.style.zIndex = "999999999";
        return new SearchModal({
          target: container,
          props: {
            db: new FactsORM(new RuntimeAdapter()),
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
