// import {ContentScriptContext} from "wxt/client";
import {createRoot} from "react-dom/client";
import App from "./popup/App";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: "example-ui",
      position: "inline",
      onMount: container => {
        // Container is a body, and React warns when creating a root on the body, so create a wrapper div
        const app = document.createElement("div");
        container.append(app);

        // Create a root on the UI container and render a component
        const root = createRoot(app);
        root.render(<App />);
        return root;
      },
      onRemove: root => {
        // Unmount the root when the UI is removed
        root?.unmount();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});

// const onKeyPress = (ctx: ContentScriptContext) => (event: KeyboardEvent) => {
//   if (event.ctrlKey && event.key === ".") {
//     mountApp(ctx).then(root => root.mount());
//   }
// };

// const mountApp = (ctx: ContentScriptContext) => {
//   return createShadowRootUi(ctx, {
//     name: "app",
//     position: "modal",
//     onMount(container) {
//       const app = document.createElement("div");
//       container.append(app);
//       // Create a root on the UI container and render a component
//       const root = createRoot(app);
//       root.render(<App />);
//       return root;
//     },
//     onRemove(root) {
//       root?.unmount();
//     },
//   });
// };
