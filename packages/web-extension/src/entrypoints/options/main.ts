import "@repo/facts-web-app/dist/style.css";
import {DexieAdapter} from "@repo/facts-db-adapter";
import {FactsApp} from "@repo/facts-web-app";
import {ORM, createFactsDB} from "@repo/facts-db";

const app = new FactsApp({
  target: document.querySelector("#app")!,
  props: {
    db: new ORM(new DexieAdapter(createFactsDB("facts"), "facts")),
  },
});

export default app;
