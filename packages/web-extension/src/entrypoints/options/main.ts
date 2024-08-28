import "@repo/notes-web-app/dist/style.css";
import {NotesApp} from "@repo/notes-web-app";

const app = new NotesApp({
  target: document.querySelector("#app")!,
});

export default app;
