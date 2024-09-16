import "@repo/facts-web-app/dist/style.css";
import {FactsApp} from "@repo/facts-web-app";
import {db} from "@/lib/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = new FactsApp({
  target: document.body,
  props: {db},
});
