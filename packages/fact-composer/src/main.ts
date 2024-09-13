import "./app.css";
import {FactsService, createMemoryAdapter} from "@repo/facts-service";
import App from "./App.svelte";

const app = new App({
  target: document.querySelector("#app")!,
  props: {
    db: new FactsService(createMemoryAdapter),
  },
});

export default app;
