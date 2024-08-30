import "@repo/notes-web-app/dist/style.css";
import {Notes} from "@repo/notes-db";
import {NotesApp} from "@repo/notes-web-app";

const app = new NotesApp({
  target: document.querySelector("#app")!,
  props: {
    notes: new Notes(),
  },
});

export default app;
