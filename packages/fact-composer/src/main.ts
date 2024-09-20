import "./app.css";
import {DbClient, createMemoryAdapter} from "@repo/facts-db";
import App from "./App.svelte";

const app = new App({
  target: document.querySelector("#app")!,
  props: {
    db: new DbClient(createMemoryAdapter),
  },
});

export default app;
