import "@repo/search-modal/dist/style.css";
import {SearchModal} from "@repo/search-modal";

export default defineContentScript({
  matches: ["<all_urls>"],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      onMount: container => {
        // Create the Svelte app inside the UI container
        return new SearchModal({
          target: container,
        });
      },
      onRemove: app => {
        // Destroy the app when the UI is removed
        app?.$destroy();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
