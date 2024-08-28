<script>
  import AddNote from "$lib/AddNote.svelte";
  import NotesGrid from "$lib/NotesGrid.svelte";
  import "./app.css";
</script>

<main class="flex flex-col items-center w-full h-full p-24">
  <AddNote />
  <NotesGrid />
</main>
