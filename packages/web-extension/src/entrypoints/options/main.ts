import "@repo/facts-web-app/dist/style.css";
import {FactDao} from "@repo/facts-db";
import {NotesApp} from "@repo/facts-web-app";

const app = new NotesApp({
  target: document.querySelector("#app")!,
  props: {
    notes: new FactDao(),
  },
});

export default app;
