<script lang="ts">
  import { db, liveQuery } from '@repo/notes-db';
  import NotesGridItem from './NotesGridItem.svelte';
  let input: HTMLInputElement;

  const notes = liveQuery(() => db.notes.toArray());

  async function removeNote(id: string) {
    db.notes.delete(id);
  }
</script>

<div class="columns-2 lg:columns-5 w-4/5">
  {#if $notes}
    {#each $notes as note (note.id)}
      <NotesGridItem>
        {note.content}
        <div slot="footer">
          <button on:click={() => removeNote(note.id)}>[x]</button>
        </div>
      </NotesGridItem>
    {/each}
  {/if}
</div>
