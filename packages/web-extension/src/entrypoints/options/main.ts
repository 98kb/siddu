import "@repo/facts-web-app/dist/style.css";
import {FactsApp} from "@repo/facts-web-app";
import {createFactsORM} from "@repo/facts-db";

const app = new FactsApp({
  target: document.querySelector("#app")!,
  props: {
    db: createFactsORM("facts"),
  },
});

export default app;
