<script lang="ts">
  import type {DAO, Note} from "@repo/notes-db";
  import AddNote from "$lib/AddNote.svelte";
  import NotesGrid from "$lib/NotesGrid.svelte";
  import "./app.css";

  export let notes: DAO<Note>;
</script>

<main class="flex w-full h-full">
  <aside class="min-w-[15vw]">
    <nav></nav>
  </aside>
  <div class="flex flex-col items-center w-full h-full p-10 gap-20">
    <AddNote {notes} />
    <NotesGrid {notes} />
  </div>
</main>
