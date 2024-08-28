<script lang="ts">
  import { db, liveQuery } from '@repo/notes-db';
  let input: HTMLInputElement;

  const notes = liveQuery(() => db.notes.toArray());

  async function removeNote(id: string) {
    db.notes.delete(id);
  }
</script>

<div class="grid grid-flow-row grid-cols-3 gap-7">
  {#if $notes}
    {#each $notes as note (note.id)}
      <div>
        <p>{note.content}</p>
        <button on:click={() => removeNote(note.id)}>[x]</button>
      </div>
    {/each}
  {/if}
</div>
